import { Remarkable } from "remarkable";

const md = new Remarkable({
  breaks: true,
});

// eslint-disable-next-line react/prop-types
export default function MarkdownPreview({ markdown }) {
  return <div dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />;
}
