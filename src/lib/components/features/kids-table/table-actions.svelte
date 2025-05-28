<script lang="ts">
	interface IProps {
		onupdate: () => void;
		ondelete: () => void;
	}

	let data: IProps = $props();
</script>
