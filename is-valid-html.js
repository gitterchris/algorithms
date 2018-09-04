/*
  Problem: write a function that accepts a stringified HTML and checks if the HTML is valid or not.
*/

/*
  Questions to ask:
  - Do we need to consider self-closing tags?
  - How about newlines and other white spaces?
  - Do we need to consider the top most DOCTYPE tag?
  - Is the input full HTML? In other words, should it be enclosed with the topmost html, head and body tags?
  - Do we consider custom tags? Or should we consider only the valid HTML tags?

  Algorithm:
  - Parse the string to an array
    - for each valid tag in an array,
      if closing tag,
        if stack is empty, return false;
        while stack is not empty. pop until you find the corresponding opening tag. break the while when the next popped item is an opening pair
      else
        push in the stack.
  
  - return stack.isEmpty
*/

function isValidHTML(html) {
  if (!html) return false;

  const htmlTags = parseHtml(html);
  if (htmlTags === null) return false;

  const stack = [];

  for (let i = 0; i < htmlTags.length; i++) {
    const tag = htmlTags[i];

    if (isClosingTag(tag)) {
      if (stack.length === 0) return false;

      while (stack.length !== 0) {
        const top = stack.pop();

        if (isOpeningPair(top, tag)) break;
      }
    } else
      stack.push(tag);
  }

  return stack.length === 0;
}

/*
  - Remember the first time you see an opening angle bracket (<)
  - if you see a closing tag, slice the array then restart startIndex.
*/
function parseHtml(html) {
  const arr = [];
  let startIndex = null;

  for (let i = 0; i < html.length; i++) {
    const ch = html[i];

    if (ch === '<') startIndex = i;

    if (ch === '>') {
      if (startIndex === null) return null;

      arr.push(html.substr(startIndex, i - startIndex + 1));
      startIndex = null;
    }
  }

  return arr;
}

function isClosingTag(tag) {
  return tag.substr(0, 2) === '</';
}

function isOpeningPair(openingTag, closingTag) {
  return openingTag.substr(1, openingTag.length - 2) ===
    closingTag.substr(2, closingTag.length - 3);
}
