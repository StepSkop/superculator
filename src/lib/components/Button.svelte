<script lang="ts">
	import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
    export let content = "X"
    function disp(event: any){
        dispatch('click', event)
    }
</script>
<button class="{'bg-base-100 btn btn-outline btn-success w-full h-full text-lg'}" on:click={disp}><p>{content}</p></button>