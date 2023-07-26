# svelte-tilt

Simple tilt library.

## Usage

```html
<script lang="ts">
    import tilt from 'svelte-tilt'
</script>

<div use:tilt class="w-40 h-40 bg-blue-300"> <!-- Using tailwind, but you can use any styling you want. -->
<div use:tilt={{ strength: 5 }} class="w-40 h-40 bg-green-300"> <!-- Or use options! -->
```

Find more in the demo: https://leodog896.github.io/svelte-tilt/

## References

https://svelte.dev/repl/7b23ad9d2693424482cd411b0378b55b?version=3.24.1
