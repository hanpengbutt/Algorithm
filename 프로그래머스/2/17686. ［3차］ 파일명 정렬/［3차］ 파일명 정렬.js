function solution(files) {
  const regExp = /^(\D+)(\d{1,5})(.*)$/;
    
  files = files.map((file) => {
      const [_, head, number, tail] = file.match(regExp);
      return [head, number, tail];
  })

  files.sort((a, b) => {
    let v = a[0].toLowerCase().localeCompare(b[0].toLowerCase());
    if (v === 0) {
      v = +a[1] - +b[1];
    }
    return v;
  });

  return files.map((file) => file.join(''));
}