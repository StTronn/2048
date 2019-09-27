
// grid 0 for empty other numbers
//make move function
//  build traversals 
//  iterate throush traversals x and y 
//  for each check wether it is non empty tile
//  if tile not empty 
//  find next_empty (x,y) 
//  swap tile and next_empty  
// let grid=[[2,2,0,0],[2,0,0,2],[0,0,0,0],[0,2,0,0]];       

//reutrns true if cell has valid cordinates
export function calc_score(grid){
    let score=0;
    for(let i=0;i<4;i++)
        for(let x of grid[i])
            score+=x;
    return score;        
}
export function matches_available(new_grid){
    for(let i=0;i<3;i++)
        for(let j=0;j<4;j++)
            if(new_grid[i][j]===new_grid[i+1][j]) return false;
    for(let i=0;i<4;i++)
        for(let j=0;j<3;j++)
        if(new_grid[i][j]===new_grid[i][j+1]) return false;
    return true;
}

export function genrate_random_empty_pos(d,s){
    if (s==="UP")
        for(let j=0;j<4;j++)
            if(d[3][j]===0)
                return {i:3,j};
    if(s==="DW")
        for(let j=0;j<4;j++)
            if(d[0][j]===0)
                return {i:0,j};
    if (s==="RT")
        for(let i=0;i<4;i++)
            if(d[i][0]===0)
                return {i,j:0};
    if(s==="LT")
        for(let i=0;i<4;i++)
            if(d[i][3]===0)
                return {i,j:3};
}
export function is_full(grid){
    for(let i=0;i<4;i++)
        for(let j=0;j<4;j++)
            if(grid[i][j]===0) return false;
    return true;
}
export function move(grid,s){
    const size=4;
    let withinBounds=(cell)=>{
        return cell.i >= 0 && cell.i < size &&
        cell.j >= 0 && cell.j < size;
    }
    //returns true if cell avelible 
    let cellAvalible=(cell)=>{
        if(grid[cell.i][cell.j]!==0)
            return false;
        else 
            return true;
    }
    let find_next_pos=(cell,vector)=>{
        var prev;
        do{
            prev=cell;
            cell={i:prev.i+vector.i,j:prev.j+vector.j}
        }while(withinBounds(cell)&&cellAvalible(cell)) 
        return cell;  
    }
    let find_farthest_pos=(cell,vector)=>{
        var prev;
        do{
            prev=cell;
            cell={i:prev.i+vector.i,j:prev.j+vector.j}
        }while(withinBounds(cell)&&cellAvalible(cell)) 
        return prev;
    }
    let swap=(cell_1,cell_2)=>{
        //cell2 becomes cell1 
        //cell1 becomes 0
        var temp_val=grid[cell_1.i][cell_1.j];
        grid[cell_1.i][cell_1.j]=0;
        grid[cell_2.i][cell_2.j]=temp_val;
    }
    let equals=(cell_1,cell_2)=>{
        if(grid[cell_1.i][cell_1.j]===grid[cell_2.i][cell_2.j])
            return true;
        else 
            return false;
    }
    let merge=(cell_1,cell_2)=>{
        //merge at pos of cell2 
        grid[cell_2.i][cell_2.j]*=2;
        grid[cell_1.i][cell_1.j]=0;
    }
    let moveCell=(cell,vector)=>{
        let farthest=find_farthest_pos(cell,vector);
        let next=find_next_pos(cell,vector);
        if(withinBounds(next) && !cellAvalible(next) && equals(cell,next)){
            merge(cell,next); //make cell pos 0 0 and incr next 
        }
        else{
            swap(cell,farthest);
        }
    }
    //move up
    let move_up=()=>{
        let vector={i:-1,j:0};
        for(let i=0;i<4;i++)
        for(let j=0;j<4;j++)
        {
            if(!cellAvalible({i,j}))
            moveCell({i,j},vector);
        }
    } 
    //move down
    let move_down=()=>{
        let vector={i:1,j:0};
        for(let i=3;i>=0;i--)
        for(let j=3;j>=0;j--)
        if(!cellAvalible({i,j}))
        moveCell({i,j},vector);
        
    }
    //move left 
    let move_left=()=>{
        let vector={i:0,j:-1}
        for(let i=0;i<4;i++)
        for(let j=0;j<4;j++)
        if(!cellAvalible({i,j}))
            moveCell({i,j},vector);
    }
    //move right 
    let move_right=()=>{
        let vector={i:0,j:1}
        for(let i=3;i>=0;i--)
        for(let j=3;j>=0;j--)
        if(!cellAvalible({i,j}))
        moveCell({i,j},vector);
    }    
    if(s==="UP")
        move_up();
    if(s==="DW")
        move_down();
    if(s==="LT")
        move_left();
    if(s==="RT")
        move_right();
    return grid;

}
//move up requires top down traversal vector(i:-1,j:0) 
//move down requires down top traversal vector(i:1,j:0)
//move left requires top down traversal vector(x:-1,y:0)
//move right requires down top traversal vector(x:1,y:0)

