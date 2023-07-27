var track = 0, previous = null;
function GetBlocks()
{
    const width = '8vw';
    let height = null;
    let MinHeight = 20;
    let MaxHeight = 60;
    let BirdHeight = 25;
    let Range = 10;
    if (previous != null)
    {
        let low = Math.max(MinHeight, previous - Range);
        let high = Math.min(previous + Range, MaxHeight);
        height = ((Math.random() * 100) % (high - low)) + low;
    }
    else
    {
        height = ((Math.random() * 200) % 40) + MinHeight;
    }
    
    const block = document.createElement("div");
    block.classList.add('Block');
    
    document.getElementsByClassName('Obstacles')[0].append(block);
    
    block.style.height = height + 'vh';
    block.style.width = width;
    
    previous = height;
    track++;

    const GroundHeight = 100 - height - BirdHeight - 10 - ((Math.random() * 100) % 7);
    
    const ground = document.createElement("div");
    ground.classList.add("Ground");

    document.getElementsByClassName('Obstacles')[0].append(ground);

    ground.style.height = GroundHeight + 'vh';
    ground.style.width = width;

    let elapsedTime = 0;
    const intervalId = setInterval(() => {
        elapsedTime += 0.1;

        if (elapsedTime >= 3.2) 
        {
            let cube = document.getElementsByClassName("Cube")[0];
            const BlockRect = block.getBoundingClientRect();
            const { top : BlockTop, left : BlockLeft, bottom : BlockBottom, right : BlockRight} = BlockRect;
            const CubeRect = cube.getBoundingClientRect();
            const { top : CubeTop, left : CubeLeft, bottom : CubeBottom, right : CubeRight} = CubeRect;
            const GroundRect = ground.getBoundingClientRect();
            const { top : GroundTop, left : GroundLeft, bottom : GroundBottom, right : GroundRight} = GroundRect;
            if((CubeRight >= BlockLeft && CubeRight <= BlockRight) || (CubeLeft <= BlockRight && CubeLeft >= BlockLeft) || (CubeLeft == BlockLeft && CubeRight == BlockRight))
            {
                if(CubeTop <= BlockBottom)
                {
                    clearInterval(BlockInterval);
                    clearInterval(MoveCube);
                }
            }
            if((CubeRight >= GroundLeft && CubeRight <= GroundRight) || (CubeLeft <= GroundRight && CubeLeft >= GroundLeft) || (CubeLeft == GroundLeft && CubeRight == GroundRight))
            {
                if(CubeBottom >= GroundTop)
                {
                    clearInterval(BlockInterval);
                    clearInterval(MoveCube);
                }
            }
        }
    }, 100);

}

let BlockInterval = setInterval(GetBlocks, 1000)

let CTop = 45;
let MoveCube = setInterval( () => 
    {
        var cube = document.getElementsByClassName("Cube")[0];
        CTop  += 0.1;
        cube.style.marginTop = CTop + 'vh';
    }, 2)

let CheckEnd = setInterval( () => {
        if(CTop < -10 || CTop > 84)
        {
            clearInterval(MoveCube);
            clearInterval(BlockInterval);
        }
    }, 200)

function KeepUp()
{
    CTop -= 10;
}

document.addEventListener('keyup', KeepUp);