function solution(files) {
  files = files.map((file) => {
    let newFile;
    let flag = 1;
    let firstIdx = 0;
    let lastIdx = file.length;
    for (let i = 0; i < file.length; i++) {
      if (file[i] !== ' ' && Number.isInteger(+file[i])) {
        if (flag) {
          flag = 0;
          firstIdx = i;
        }
      } else if (!flag) {
        lastIdx = i;
        break;
      }
    }
    newFile = [
      file.slice(0, firstIdx),
      file.slice(firstIdx, lastIdx),
      file.slice(lastIdx),
    ];
    return newFile;
  });

  files.sort((a, b) => {
    let v = a[0].toLowerCase().localeCompare(b[0].toLowerCase());
    if (v === 0) {
      v = +a[1] - +b[1];
    }
    return v;
  });

  return files.map((file) => file.join(''));
}