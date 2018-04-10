<template lang="html">
	<section>
		<div class="chat ui container">
			<div class="chat-inner">
				<div class="chat__field">
					<div class="chat__msg">
						<div class="chat__msg-date"><small>04.03.10<br>12:45</small></div>
						<div class="chat__msg-name"><strong>Boris</strong></div>
						<div class="chat__msg-text">Hi everyone i am Boris</div>
					</div>
					<div class="chat__msg chat__msg_own">
						<div class="chat__msg-date"><small>04.03.10<br>12:45</small></div>
						<div class="chat__msg-name"><strong>You</strong></div>
						<div class="chat__msg-text">Hi everyone i am Boris</div>
					</div>
				</div>
				<form class="ui form">
					<div class="field">
						<textarea class="chat__input" type="text"></textarea>
					</div>
				</form>

			</div>
		</div>
	</section>
</template>

<script>

export default {

}

</script>


<style lang="scss" scoped>
	.chat{
		border: 1px solid #cccccc;
		border-radius: 4px;
		padding: 20px;

		&__field{
			padding: 10px;
			border: 1px solid #cccccc;
			border-radius: 4px;
			height: 500px;
			overflow: auto;
			margin: 0 0 20px;
		}

		&__msg{
			margin: 0 0 5px;
			padding: 5px;
			background-color: #CFD8DC;
			border-radius: 4px;
			&_own{
				background-color: #90CAF9;
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
