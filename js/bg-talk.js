const dialogues = [
    { speaker: 'B', text: '这电视剧咋还不更新呢，等得我花儿都谢了。' },
    { speaker: 'A', text: 'hello！请问你在看什么？' },
    { speaker: 'B', text: '我在看《六姊妹》呢，央视一套开年大剧，最近可火了，就在淮南拍的，看得我这个新淮南人自豪感满满。哎，老妹你咋长得恁像里面的四姐何家欢呢？' },
    { speaker: 'A', text: '有没有一种可能我就是呢，要不要让我这个老淮南人带你这个新淮南人深入了解一下淮南的文化？？' },
    { speaker: 'B', text: '这可太行了姐！我连发朋友圈的BGM都选好了——周杰伦的《青花瓷》。！' },
    { speaker: 'A', text: '那今天就带你沉浸式体验一下淮南的非遗文化。第一站——淮南市文化艺术中心，咱先整点‘硬核’文化输出！' },
];

const charA = document.getElementById('charA');
const charB = document.getElementById('charB');
const dialogueEl = document.getElementById('dialogue');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentDialogue = -1;

function updateDialogue(direction) {
    // 更新当前对话索引
    currentDialogue = direction === 'next' ? currentDialogue + 1 : currentDialogue - 1;

    // 边界检查
    currentDialogue = Math.max(-1, Math.min(currentDialogue, dialogues.length - 1));

    // 更新按钮状态
    prevBtn.disabled = currentDialogue <= -1;
    nextBtn.disabled = currentDialogue >= dialogues.length - 1;

    // 处理初始/结束状态
    if (currentDialogue === -1) {
        dialogueEl.textContent = "点击开始对话";
        resetCharacterStates();
        return;
    }

    if (currentDialogue >= dialogues.length) {
        dialogueEl.textContent = "对话结束";
        resetCharacterStates();
        return;
    }

    // 更新对话内容和角色状态
    const current = dialogues[currentDialogue];
    dialogueEl.textContent = current.text;
    updateCharacterStates(current.speaker);
}

function updateCharacterStates(speaker) {
    if (speaker === 'A') {
        charA.classList.add('active');
        charA.classList.remove('inactive');
        charB.classList.add('inactive');
        charB.classList.remove('active');
    } else {
        charB.classList.add('active');
        charB.classList.remove('inactive');
        charA.classList.add('inactive');
        charA.classList.remove('active');
    }
}

function resetCharacterStates() {
    charA.classList.remove('active', 'inactive');
    charB.classList.remove('active', 'inactive');
}

// 事件监听
nextBtn.addEventListener('click', () => updateDialogue('next'));
prevBtn.addEventListener('click', () => updateDialogue('prev'));
