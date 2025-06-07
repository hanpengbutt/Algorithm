function solution(m, musicinfos) {
    const regExp = /.#?/g;
    m = m.match(regExp);
    m = `/${m.join('/')}/`;
    
    let maxPlayTime = 0;
    let result;
    
    musicinfos.forEach((musicinfo) => {
        let [start, end, name, note] = musicinfo.split(',');
        start = start.split(':').map(Number);
        end = end.split(':').map(Number);
        note = note.match(regExp);
        const playTime = end[0] * 60 + end[1] - (start[0] * 60 + start[1]);
        
        const playNote = [];
        for(let i = 0; i < playTime; i++) {
            playNote.push(note[i % note.length]);
        } 
        
        if(`/${playNote.join('/')}/`.includes(m)) {
            if(maxPlayTime < playTime) {
                result = name;
                maxPlayTime = playTime;
            }
            
        }
    });
    
    return result || '(None)';
}