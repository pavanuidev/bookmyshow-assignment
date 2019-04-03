let arr = [7000,7001,7002,7003,7004,7005];

function validateRegex(inputValue) {
  // checking for numbers, hyphen(-) and space
  const patt1 = /^[0-9,-\s]*$/g;
    const result = inputValue.match(patt1);
    if(result && result[0]) {
      return result[0]
    }
    return false;
}

function processNumbersBetweenRange(value, uniqueArr, duplicateArr) {
  // get all the numbers between the given range, then checks in the original array,
  // if not present, pushes in the unique array
  const numArr = value.split('-');
  const minValue = parseInt(numArr[0].trim());
  const maxValue = parseInt(numArr[1].trim());

  for (var i = minValue; i <= maxValue; i++) {
    if(!checkInArray(i, duplicateArr)) {
      uniqueArr.push(i);
    }
  }
}

function checkInArray(input, duplicateArr) {
  // checks any number in the original array, if found, pushes in duplicate array.
  let inArr = false;
  for(let i in arr) {
    if(arr[i] == input) {
      duplicateArr.push(input);
      inArr = true;
      break;
    }
  }
  return inArr;
}

function submitInput () {
  let inputValue = document.getElementById('my_input').value;
  let validatedStr = validateRegex(inputValue);
    if(validatedStr) {
      let uniqueArr = [];
      let duplicateArr = [];
      if(validatedStr.indexOf(',') != -1) {
        let numArr = validatedStr.split(',');

        numArr.map((num) => {
          if(num) {
            if(num.indexOf('-') != -1) {
            processNumbersBetweenRange(num, uniqueArr, duplicateArr);
            } else if(num.match(/\d+/).length) {
              if(!checkInArray(parseInt(num.trim()), duplicateArr)) {
              uniqueArr.push(parseInt(num.trim()));
            }
            }
          }
        });
      } else if(validatedStr.indexOf('-') != -1) {
        processNumbersBetweenRange(validatedStr, uniqueArr, duplicateArr);
      }

      let filteredArr = arr.filter(function(obj) { return duplicateArr.indexOf(obj) == -1; });
      let finalArr = uniqueArr.concat(filteredArr);
      console.log("Duplicate Array :", duplicateArr);
      console.log('Final List :', finalArr);
      document.getElementById('duplicates').innerHTML = duplicateArr;
      document.getElementById('final_list').innerHTML = uniqueArr.concat(filteredArr);
    } else {
      alert('Please provide numbers only');
    }

}
