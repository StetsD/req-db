<template lang="html">
	<section>
		<div class="chat ui container">
			<div class="chat-inner">
				<div class="chat__field" ref="chatField" @dragover.prevent @drop="onDrop">
					<div class="chat__msg" v-for="(item, i) in messages" :key="i" :class="[item.type, {chat__msg_own: currentUserName === item.name ? 'chat__msg_own' : ''}]">
						<div class="chat__msg-date"><small>{{item.date}}<br>{{item.time}}</small></div>
						<div class="chat__msg-name"><strong>{{currentUserName === item.name ? 'You' : item.name}}</strong></div>
						<div class="chat__msg-text">{{item.msg}}</div>
					</div>
				</div>
				<form class="ui form">
					<div class="field">
						<textarea @keyup.enter="send" class="chat__input" type="text" v-model="currentMsg"></textarea>
					</div>
				</form>

				<form reg="formUpload" class="form-upload form-dropzone" action="/api/v1/chat" method="post" enctype="multipart/form-data">
					<input type="file" name="megafile">
					<input type="submit" value="upload">
				</form>
				<img :src="image" alt="">
			</div>
		</div>
	</section>
</template>

<script>


const {IO} = require('~/assets/modules/socket-io-cli');
const fileUploader = require('~/assets/modules/file-upload');
const {io, api} = require('../../config');

export default {
	data(){
		return {
			currentUserName: '',
			currentMsg: '',
			messages: [],
			image: ''
		}
	},
	async created(){
		this.currentUserName = this.$store.getters['user/getUser'].name
		await this.$store.dispatch('chat/fetchHistory');
		this.messages = this.$store.getters['chat/getHistory'];
	},
	methods: {
		send(){
			IO.emit(io['chat:message'], {
				name: this.currentUserName,
				msg: this.currentMsg
			});

			this.currentMsg = '';

		},
		msgOffsetField(){
			let {chatField} = this.$refs;
			if(chatField.scrollHeight > chatField.offsetHeight){
				chatField.scrollTop = 100 + chatField.scrollHeight - chatField.offsetHeight;
			}
		},
		onDrop(e){
			e.stopPropagation();
			e.preventDefault();
			let files = e.dataTransfer.files;
			// this.createFile(files[0]);

			fileUploader(files[0], `${api.name}/${api.version}/chat`,
				(string)=> {console.log(string)},
				(load, total) => {console.log(load, total)}
			);
		},
		addFile(e){
			let files = e.target.files;
			// this.createFile(files[0]);

		},
		createFile(file){

			if(!file.type.match('image.*')){
				let img = new Image();
			}

			let reader = new FileReader();

			reader.onload = e => {
				// this.image = e.target.result;

			}

			reader.readAsDataURL(file);
		}
	},
	watch: {
		messages(){
			this.$nextTick(() => {
				this.msgOffsetField();
			});
		}
	}
}

</script>


<style lang="scss" scoped>
	.chat{
		border: 1px solid #cccccc;
		border-radius: 6px;
		padding: 20px;

		&__field{
			padding: 10px;
			border: 1px solid #cccccc;
			border-radius: 6px;
			height: 500px;
			overflow: auto;
			margin: 0 0 20px;
		}

		&__msg{
			margin: 0 0 5px;
			padding: 5px;
			background-color: #CFD8DC;
			border-radius: 6px;
		    clear: both;
			&_own{
				background-color: #90CAF9;
			}
			&.disconnect{
				background-color: #FFAB91;

			}
			&.connect{
				background-color: #C5E1A5;
			}
			&.disconnect, &.connect{
				clear: both;
				float: right;
				width: 40%;

				&::after, &::before{
					content: '';
					display: block;
					clear: both;
				}
			}
		}

		&__msg-date{
			text-align: center;
			float: right;
			margin: 0 10px 0 0;
			display: inline-block;
			vertical-align: middle;
		}

		&__msg-name{
			display: inline-block;
			vertical-align: middle;
		}

		&__msg-text{
			margin: 2px 0 0 0;
		}

		.chat__input{
			resize: none;
			min-height: inherit !important;
			height: 100px !important;
		}
	}
</style>
