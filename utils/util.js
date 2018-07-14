// 知识点format
const format0 = (str, index) => {
  const rxp = /\*\*[^\*]*\*\*?/g;
  const temp = str.split(rxp); // 非重点
  const temp2 = str.match(rxp) || []; // 重点
  const temp3 = [{name: 'span', attrs:{class: 'num'}, children:[{type: 'text', text: `${index+1}.`}]}];
  // 穿插
  for(let i=0; i< Math.max(temp.length,temp2.length);i++){
    if(i<temp.length){
      temp3.push({ name: 'span', children: [{ type: 'text', text: temp[i] }] });
    }
    if(i<temp2.length){
      temp3.push({ name: 'span', attrs:{class: 'b'}, children: [{ type: 'text', text: temp2[i].replace(/\*/g, "") }] });
    }
  }
  return [{
    name: 'span',
    children: temp3
  }];
}

// 选择题、简答题x、标题T、无答案N、format
const format1 = (str, index) => {
  const temp = str.split("@"); // 答案@题目@选项
  if(temp[0] === 'T'){ // 这是普通标题
    return {t: temp[1]};
  } else if(temp[0] === 'X'){
    return {xa: temp[2], xq: temp[1], n: index};
  } else {
    return { a: temp[0], q: temp[1], c: temp[2].split("|") , n: index};
  }
}

module.exports = {
  format0,
  format1,
}
