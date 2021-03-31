$("document").ready(()=>{
     let visibleTextNodes = () => {
        var walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_ALL,
            (node)=> {
                if (node.nodeType == 3) {
                    return NodeFilter.FILTER_ACCEPT;
                } else if (node.offsetWidth && node.offsetHeight && node.style.visibility != 'hidden') {
                    return NodeFilter.FILTER_SKIP;
                } else {
                    return NodeFilter.FILTER_REJECT;
                }
            },
            false
        );
    
        for (var nodes = []; walker.nextNode();) {
            nodes.push(walker.currentNode);
        }
        return nodes;
    }
    
    let highlight = (needle) => {
        needle = needle.replace(/\s/g, '').toLowerCase();
    
        var textNodes = visibleTextNodes();
    
        for (var i = 0, texts = []; i < textNodes.length; i++) {
            texts.push(textNodes[i].nodeValue.replace(/\s/g, '').toLowerCase());
        }
    
        var matchStart = texts.join('').indexOf(needle);
        if (matchStart < 0) {
            return false;
        }
    
        var nodeAndOffsetAtPosition = (position) => {
            for (var i = 0, consumed = 0; consumed + texts[i].length < position; i++) {
                consumed += texts[i].length;
            }
            var whitespacePrefix = textNodes[i].nodeValue.match(/^\s*/)[0];
            return [textNodes[i], position - consumed + whitespacePrefix.length];
        };
    
        var range = document.createRange();
        range.setStart.apply(range, nodeAndOffsetAtPosition(matchStart));
        range.setEnd.apply(  range, nodeAndOffsetAtPosition(matchStart + needle.length));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        range.startContainer.parentNode.scrollIntoView();
    }

    $("#searchForm").submit(e=>{
        e.preventDefault();
        let searchForm = new FormData(document.forms.searchForm)
        highlight(searchForm.get("search"))
    })
})