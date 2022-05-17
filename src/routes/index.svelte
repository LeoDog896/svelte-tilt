<script lang="ts">
  import tilt, { type UserFacingTiltSettings } from "$lib"

  const tilts: { settings: UserFacingTiltSettings, description: string, code: string, class: string }[] = [
    {
      class: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
      settings: {},
      description: "Default",
      code: "use:tilt"
    },
    {
      class: "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
      settings: { strength: 3 },
      description: "Strong",
      code: "use:tilt={{ strength: 3 }}"
    },
    {
      class: "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400",
      settings: { reverse: true },
      description: "Reversed",
      code: "use:tilt={{ reverse: true }}"
    },
    {
      class: "bg-gradient-to-r from-red-400 via-gray-300 to-blue-500",
      settings: { scale: 1.2 },
      description: "Scale",
      code: "use:tilt={{ scale: 1.2 }}"
    },
    {
      class: "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
      settings: { transition: 50 },
      description: "Short transition",
      code: "use:tilt={{ transition: 50 }}"
    },
    {
      class: "bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500",
      settings: { transition: 1000 },
      description: "Long transition",
      code: "use:tilt={{ transition: 1000 }}"
    },
    {
      class: "bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400",
      settings: { xAxis: false },
      description: "Disable X axis",
      code: "use:tilt={{ xAxis: false }}"
    },
    {
      class: "bg-gradient-to-b from-green-300 to-purple-400",
      settings: { yAxis: false },
      description: "Disable Y axis",
      code: "use:tilt={{ yAxis: false }}"
    },
    {
      class: "",
      settings: { recovery: false },
      description: "Disable recovery (and keep tilt state)",
      code: "use:tilt={{ recovery: false }}"
    }
  ]

  let currentPosition: string = ""
</script>

<div class="m-16">
  <h1 class="text-6xl p-6 block bg-gradient-to-r from-blue-200 to-blue-300 w-min whitespace-nowrap" use:tilt>
    <span style="transform: translateZ(100px);" class="block">svelte-tilt</span>
  </h1>
  <code>npm i -D svelte-tilt</code>

  <div class="flex flex-row flex-wrap w-full">
    {#each tilts as tiltObj}
      <div class="flex flex-row basis-[calc(50%_-_2rem)] items-center border border-gray-400 p-4 m-4">
        <div use:tilt={tiltObj.settings} class="{tiltObj.class} drop-shadow-lg m-5 ml-8 bg-sky-500 w-40 h-40 float-left"></div>
        <span class="h-min">{tiltObj.description}<br/><code>{tiltObj.code}</code></span>
      </div>
    {/each}
    <div class="flex flex-row basis-[calc(50%_-_2rem)] items-center border border-gray-400 p-4 m-4">
      <div use:tilt class="drop-shadow-lg m-5 ml-8 bg-sky-500 w-40 h-40 float-left flex justify-center items-center">
        <span class="text-white text-lg block" style="transform: translateZ(100px);">Float!</span>
      </div>
      <span class="h-min">Floaty Text<br/>
      <code><b>(child)</b> transform: translateZ(20px); display: block;</code></span>
    </div>
    <div class="flex flex-col flex-wrap basis-[calc(100%_-_2rem)] items-center border border-gray-400 p-4 m-4">
      <div class="flex flex-row">
        <div use:tilt on:tilt={event => {
          currentPosition = JSON.stringify(event.detail);
        }} class="drop-shadow-lg m-5 ml-8 bg-sky-500 w-40 h-40 float-left"></div>
        <span class="h-min">Listen to changes<br/><code>use:tilt {'on:tilt={event => console.log(event.detail)} on:mouseleave=... on:mouseenter=...'}</code></span><br/>
      </div>
      <p>{currentPosition}</p>
    </div>
  </div>
</div>