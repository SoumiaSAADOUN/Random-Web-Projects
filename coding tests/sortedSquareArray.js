var sortedSquares = function(nums) {
    let sortedArr = new Array();
    let  n =nums.length, k=n-1, right=k, left=0 ;

    for(let i=0; i<n; i++){
        if(nums[left]*nums[left] <= nums[right]*nums[right]) {
            sortedArr[k]= nums[right]*nums[right];
            right--; k--;
        }else{
            sortedArr[k]= nums[left]*nums[left];
            left++; k--;
        }


    }
    return sortedArr;
};