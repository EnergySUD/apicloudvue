<template>
	<div class="my-lottery">
		<van-nav-bar
		  title="My lottery"
		  left-arrow
		  @click-left="onClickLeft"
		/>
	</div>
</template>

<script>
	export default {
		name: 'MyLottery',
		data() {
			return {
	
			}
		},
		methods: {
			onClickLeft(){
				console.log(1)
			}
		},
	}
</script>

<style lang="scss">
	
</style>
