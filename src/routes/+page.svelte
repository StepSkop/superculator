<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { evaluate } from "mathjs"
    import brutal from "$lib/sound/Cybercut.mp3";
    import cyber from "$lib/image/cyber.png"

    let date = new Date()
    let play : boolean = false
    setInterval(() => {
        date = new Date()
    }, 1000);
    export let data
    $: time = `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`
    let displayArr : any[] = []
    let totalArr : any[] = []
    let display : any
    let justEv = false
    display = displayArr.join('')
    
    const handleVal = ((arg: string)=>{
        displayArr.push(arg)
        if (justEv) {
            totalArr = []
            justEv = false
        }
        if (totalArr.length != 0) {
            display = `${totalArr.join(' ')} ${displayArr.join('')}`
        } else {
            display = `${displayArr.join('')}`
        }

        return null
    })
    const handleOp = ((arg: string) =>{
        justEv = false
        if (displayArr.length > 0) {
            totalArr.push(parseFloat(displayArr.join('')))
        }
        displayArr = []
        display = totalArr.join(' ')
        totalArr.push(arg)
        display = totalArr.join(' ')
        return null
    })

    const handleEv = (()=>{
        totalArr.push(displayArr.join(''))
        try {
            display = evaluate(totalArr.join(''))

            if (display == 2077) {
                display = "We have a city to burn"
                play = true
            }
            displayArr = []
            if (display === "We have a city to burn") {
                totalArr = ["2077"]
            } else {
                totalArr = [display]
            }
            justEv = true
        } catch (error) {
            display = "L"
            displayArr = []
            totalArr = []
        }
        
        
    })

    const handleC = (()=>{
        totalArr = []
        displayArr = []
        display = "0"
        play = false
    })

</script>
<svelte:head>
    {#if play}
        <title>Cyberculator</title>
    {:else}
        <title>Superculator</title>
    {/if}
    
</svelte:head>
<main class="w-screen h-screen flex justify-center items-center">
    <div class="lines border-solid border-[1px] border-gray-900 scale-90 sm:scale-100 md:scale-125 p-4">
        {#if play}
            <audio id="player" autoplay>
                <source src={brutal} type="audio/mpeg">
            </audio>
        {/if}
        <div class="form-control">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
              {#if play}
                <span class="label-text">//Cyberculator</span>
                {:else}
                <span class="label-text">//Superculator</span>
              {/if}
              <span class="label-text-alt">{time}</span>
            </label>
            {#if display}
                <textarea class="textarea textarea-bordered h-24" class:logo-1={play} placeholder="Wake the f*ck up, Samurai" readonly>{display}</textarea>
                {:else}
                <textarea class="textarea textarea-bordered h-24" placeholder="Wake the f*ck up, Samurai" readonly></textarea>
            {/if}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
              <span class="label-text-alt">{data.bucketlist}</span>
            </label>
        </div>

        <div class="grid grid-cols-4 grid-rows-5 gap-4">
            <div class="w-16 h-16">
                <Button content="C" on:click={()=>handleC()}/>
            </div>
            <div class="w-16 h-16">
                <Button content="/" on:click={()=>handleOp("/")}/>
            </div>
            <div class="w-16 h-16">
                <Button content="x" on:click={()=>handleOp("*")}/>
            </div>
            <div class="w-16 h-16">
                <Button content="-" on:click={()=>handleOp("-")}/>
            </div>
    
            <div class="w-16 h-16">
                <Button content="7" on:click={()=>handleVal("7")}/>
            </div>
            <div class="w-16 h-16">
                <Button content="8" on:click={()=>handleVal("8")}/>
            </div>
            <div class="w-16 h-16">
                <Button content="9" on:click={()=>handleVal("9")}/>
            </div>
            <div class="w-16 h-36 row-span-2">
                <Button content="+" on:click={()=>handleOp("+")}/>
            </div>
    
            <div class="w-16 h-16">
                <Button content="4" on:click={()=>handleVal("4")}/>
            </div>
            <div class="w-16 h-16">
                <Button content="5" on:click={()=>handleVal("5")}/>
            </div>
            <div class="w-16 h-16">
                <Button content="6" on:click={()=>handleVal("6")}/>
            </div>
    
            <div class="w-16 h-16">
                <Button content="1" on:click={()=>handleVal("1")}/>
            </div>
            <div class="w-16 h-16">
                <Button content="2" on:click={()=>handleVal("2")}/>
            </div>
            <div class="w-16 h-16">
                <Button content="3" on:click={()=>handleVal("3")}/>
            </div>
            <div class="w-16 h-36 row-span-2">
                <Button content="=" on:click={()=>handleEv()}/>
            </div>
    
            <div class="w-36 h-16 col-span-2">
                <Button content="0" on:click={()=>handleVal("0")}/>
            </div>
            <div class="w-16 h-16">
                <Button content="." on:click={()=>handleVal(".")}/>
            </div>
        </div>
    </div>
</main>
<style>
    .lines {
        background-image: repeating-linear-gradient(45deg,hsl(var(--b1)),hsl(var(--b1)) 13px,hsl(var(--b2)) 13px,hsl(var(--b2)) 14px);
    }

    .logo-1 {
    color: hsl(var(--su));
    animation: neon 3s infinite;
    }

    :root {
  --shadow-color: hsl(var(--su));
  --shadow-color-light: hsl(var(--su));
    }
    @keyframes neon {
    0% {
        text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),
        0 0 3px var(--shadow-color-light), 0 0 10px var(--shadow-color-light), 0 0 20px var(--shadow-color-light),
        0 0 30px var(--shadow-color), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 70px var(--shadow-color), 0 0 100px var(--shadow-color), 0 0 200px var(--shadow-color);
    }
    50% {
        text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),
        0 0 5px var(--shadow-color-light), 0 0 15px var(--shadow-color-light), 0 0 25px var(--shadow-color-light),
        0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 60px var(--shadow-color), 0 0 80px var(--shadow-color), 0 0 110px var(--shadow-color), 0 0 210px var(--shadow-color);
    }
    100% {
        text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),
        0 0 3px var(--shadow-color-light), 0 0 10px var(--shadow-color-light), 0 0 20px var(--shadow-color-light),
        0 0 30px var(--shadow-color), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 70px var(--shadow-color), 0 0 100px var(--shadow-color), 0 0 200px var(--shadow-color);
    }
    }
</style>