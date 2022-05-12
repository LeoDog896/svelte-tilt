<script lang="ts">
  import tilt, { type UserFacingTiltSettings } from "$lib/tilt"

  const classes = [
    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
    "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400",
    "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
    "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
    "bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500"
  ]

  const tilts: { settings: UserFacingTiltSettings, description: string, code: string }[] = [
    {
      settings: {},
      description: "Default",
      code: "use:tilt"
    },
    {
      settings: { strength: 5 },
      description: "Strong",
      code: "use:tilt={{ strength: 5 }}"
    },
    {
      settings: { reverse: true },
      description: "Reversed",
      code: "use:tilt={{ reverse: true }}"
    },
    {
      settings: { scale: 1.2 },
      description: "Scale",
      code: "use:tilt={{ scale: 1.2 }}"
    },
    {
      settings: { transition: 50 },
      description: "Short transition",
      code: "use:tilt={{ transition: 50 }}"
    },
    {
      settings: { transition: 1000 },
      description: "Long transition",
      code: "use:tilt={{ transition: 1000 }}"
    },
    {
      settings: { xAxis: false },
      description: "Disable X axis",
      code: "use:tilt={{ xAxis: false }}"
    },
    {
      settings: { yAxis: false },
      description: "Disable Y axis",
      code: "use:tilt={{ yAxis: false }}"
    },
    {
      settings: { recovery: false },
      description: "Disable recovery (and keep tilt state)",
      code: "use:tilt={{ recovery: false }}"
    }
  ]
</script>

<div class="m-16">
  <h1 class="text-8xl">svelte-tilt</h1>
  <code>npm i -D svelte-tilt</code>

  <div class="flex flex-row flex-wrap w-full">
    {#each tilts as tiltObj, index}
      <div class="flex flex-row basis-[calc(50%_-_2rem)] items-center border border-gray-400 p-4 m-4">
        <div use:tilt={tiltObj.settings} class="{classes[index]} drop-shadow-lg m-5 ml-8 bg-sky-500 w-40 h-40 float-left"></div>
        <span class="h-min">{tiltObj.description}<br/><code>{tiltObj.code}</code></span>
      </div>
    {/each}
  </div>
</div>