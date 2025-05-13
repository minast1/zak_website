import DOMPurify from "dompurify";

function useSanitizedHtml(html: string) {
  return DOMPurify.sanitize(html);
}

export default useSanitizedHtml;
