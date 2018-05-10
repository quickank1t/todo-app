var ar = [3,4,5,1,2];


console.log(bubblesort(ar));

function bubblesort(ar){
  console.log('in function');
  for(var i=0;i<ar.length;i++){
    for(var j=i + 1;j<ar.length;j++){
      if(ar[i] > ar[j]){
        var temp = ar[i];
        ar[i] = ar[j];
        ar[j] = temp;
      }
    }
  }

  return ar;
}
