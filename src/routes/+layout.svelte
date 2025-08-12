<script>
	import appleLogo from '$lib/assets/logos/apple-touch-icon.png';
	import logo32 from '$lib/assets/logos/favicon-32x32.png';
	import logo16 from '$lib/assets/logos/favicon-16x16.png';
	import manifest from '$lib/assets/site.webmanifest';
	import maskIcon from '$lib/assets/logos/safari-pinned-tab.svg';

	let { children } = $props();
</script>
<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href={appleLogo}>
	<link rel="icon" type="image/png" sizes="32x32" href={logo32}>
	<link rel="icon" type="image/png" sizes="16x16" href={logo16}>
	<link rel="mask-icon" href={maskIcon} color="#e0486b">
	
	<meta name="msapplication-TileColor" content="#0E0E11">
	<meta name="theme-color" content="#0E0E11">
	
	<link rel="manifest" href={manifest}>
</svelte:head>

{@render children?.()}
