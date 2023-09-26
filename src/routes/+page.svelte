<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { evaluate } from "mathjs"
    import brutal from "$lib/sound/Cybercut.mp3";

    export let data

    let date = new Date()
    setInterval(() => {
        date = new Date()
    }, 1000);
    $: time = `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`

    let op = ["C", "/", "x", "-", "7","8","9","+","4","5","6","1","2","3","=","0","."]
    let vals = ["0","1","2","3","4","5","6","7","8","9","."]
    let ops = ["/", "x", "-", "+"]

    let displayArr : any[] = []
    let totalArr : any[] = []
    let display : any
    let justEv : boolean = false
    let play : boolean = false
    
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
            totalArr.push(displayArr.join(''))
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

            if (display === 2077) {
                display = "We have a city to burn"
                totalArr = ["2077"]
                play = true
            } else {
                totalArr = [display]
            }
            displayArr = []
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
        display = ""
        play = false
    })

    const handleKey = ((e : any)=>{
        switch (e.key) {
            case "1":
            case "2": 
            case "3": 
            case "4": 
            case "5": 
            case "6": 
            case "7": 
            case "8": 
            case "9":
            case "0":
            case ".": 
                handleVal(e.key)
                break;

            case "/": 
            case "*": 
            case "-": 
            case "+":
                handleOp(e.key)
                break;
            case "Enter":
                handleEv()
                break

            case "Escape":
            case "Delete":
            case "Backspace":
                handleC()
                break
            default:
                break;
        }
    })

</script>
<svelte:head>
    {#if play}
        <title>Cyberculator</title>
    {:else}
        <title>Superculator</title>
    {/if}
    
</svelte:head>
<svelte:window on:keydown={handleKey}/>
<main class="w-screen h-screen flex justify-center items-center" >
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
                <textarea class="textarea textarea-bordered h-24" class:logo-1={play} class:text-red-500={display === "L"} placeholder="Wake the f*ck up, Samurai" readonly >{display}</textarea>
                {:else}
                <textarea class="textarea textarea-bordered h-24" placeholder="Wake the f*ck up, Samurai" readonly></textarea>
            {/if}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
              <span class="label-text-alt">{data.bucketlist}</span>
            </label>
        </div>

        <div class="grid grid-cols-4 grid-rows-5 gap-4">
            {#each op as val }
                {#if vals.includes(val)}
                    {#if val === "0"}
                        <div class="w-36 h-16 col-span-2">
                            <Button content={val} on:click={()=>handleVal(val)}/>
                        </div>
                    {:else}
                        <div class="w-16 h-16">
                            <Button content={val} on:click={()=>handleVal(val)}/>
                        </div>
                    {/if}
                {/if}

                {#if ops.includes(val)}
                    {#if val === "x"}
                        <div class="w-16 h-16">
                            <Button content={val} on:click={()=>handleOp("*")}/>
                        </div>
                    {:else if val === "+"}
                        <div class="w-16 h-36 row-span-2">
                            <Button content={val} on:click={()=>handleOp(val)}/>
                        </div>
                    {:else}
                        <div class="w-16 h-16">
                            <Button content={val} on:click={()=>handleOp(val)}/>
                        </div>
                    {/if}
                {/if}
                    
                {#if val === "C"}
                    <div class="w-16 h-16">
                        <Button content={val} on:click={()=>handleC()}/>
                    </div>
                {:else if val === "="}
                    <div class="w-16 h-36 row-span-2">
                        <Button content={val} on:click={()=>handleEv()}/>
                    </div>
                {/if}
            {/each}
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