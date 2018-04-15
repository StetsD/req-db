<template lang="html">
	<section>
		<div class="chat ui container">
			<div class="chat-inner">
				<div class="chat__field" ref="chatField" @dragover.prevent @drop="onDrop">
					<div class="chat__msg" v-for="(item, i) in messages" :key="i" :class="[item.type, {chat__msg_own: currentUserName === item.name ? 'chat__msg_own' : ''}]">
						<div class="chat__msg-date"><small>{{item.date}}<br>{{item.time}}</small></div>
						<div class="chat__msg-name"><strong>{{currentUserName === item.name ? 'You' : item.name}}</strong></div>
						<div class="chat__msg-text" v-if="!item.type">{{item.msg}}</div>
						<img @click="togglePopup" :data-origin="item.msg" class="chat__asset-img" :src="item.min" v-if="item.type === 'image'">
						<a download :href="item.msg" class="chat__asset-link" v-if="item.type === 'file'"><i class="icon huge file outline"></i></a>
					</div>
				</div>
				<div class="ui indicating success progress tiny chat__progress js-progress-chat-file">
					<div class="bar"></div>
				</div>
				<form class="ui form">
					<div class="field">
						<textarea @keyup.enter="send" class="chat__input" type="text" v-model="currentMsg"></textarea>
					</div>
				</form>
			</div>
		</div>
		<ModalDefault :visible="visibleModal" @close="togglePopup"  header="Изображение">
			<div class="" slot="content">
				<img class="chat__img-popup" :src="image" alt="Изображение">
			</div>
		</ModalDefault>
		<ModalDimmer :visible="visibleDimmer" @close="togglePopup"/>
	</section>
</template>

<script>


const {IO} = require('~/assets/modules/socket-io-cli');
const fileUploader = require('~/assets/modules/file-upload');
const {io, api} = require('../../config');

import ModalDefault from '~/components/modals/ModalDefault';
import ModalDimmer from '~/components/modals/ModalDimmer';

var progress;

export default {
	components: {
		ModalDefault,
		ModalDimmer
	},
	data(){
		return {
			//modal
			visibleModal: false,
			visibleDimmer: false,

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
	mounted(){
		progress = $('.js-progress-chat-file').progress();
	},
	methods: {
		togglePopup(e){
			if(!this.visibleModal){
				this.image = e.target.dataset.origin;
			}else{
				this.image = '';
			}

			this.visibleModal = !this.visibleModal;
			this.toggleDimmer();
		},
		toggleDimmer(){
			this.visibleDimmer = !this.visibleDimmer;
		},
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

			fileUploader(files[0], `${api.name}/${api.version}/chat`,
				(string)=> {progress.removeClass('active')},
				(load, total) => {
					progress.progress('set total', total);
					progress.progress('set progress', load);
				}
			);
			progress.addClass('active');
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
			&.image, &.file{
				width: 40%;
    			float: right;
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

		&__asset-img{
			display: block;
			margin: 5px 5px;
		    width: inherit;
			cursor: pointer;
			-webkit-user-drag: none;
			  -khtml-user-drag: none;
			  -moz-user-drag: none;
			  -o-user-drag: none;
			  user-drag: none;
		}

		&__asset-link{
			display: block;
		    margin: 0 auto;
		    width: 34%;

			& i{
				display: block;
				margin: 10px auto;
				color: #000000;
			}
		}

		&__img-popup{
			max-height: 50vw;
			display: block;
			margin: 0 auto;
		}

		&__progress{
			margin: 0 0 20px 0;
			display: none;
			&.active{
				display: block;
			}
		}

		.chat__input{
			resize: none;
			min-height: inherit !important;
			height: 100px !important;
		}
	}
</style>
