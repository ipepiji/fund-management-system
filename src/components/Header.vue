<template>
	<div id="header-wrapper">
		<div id="header-text">
			<h1>Knowledge base doesn't have to be boring</h1>
			<h3>Everything you need to manage your messaging</h3>
		</div>
		<SearchBox />
	</div>
</template>

<script>
import SearchBox from './SearchBox.vue'

export default {
	components: { SearchBox }
}
</script>

<style lang="scss" scoped>
	@import '../scss/_variables.scss';

	#header-text{
		text-align: center;
		font-family: $font-family;
		color: $text-black;
		padding: 20px;

		h1{
			font-style: normal;
			font-weight: bold;
			font-size: 34px;
			line-height: 41px;
		}

		h3{
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
			line-height: 24px;
		}
	}
</style>