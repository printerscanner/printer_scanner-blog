import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[slug].js";

const rgb = [100, 50, 0];


function setContrast() {
	// Randomly update colours
	rgb[0] = Math.round(Math.random() * 255);
	rgb[1] = Math.round(Math.random() * 255);
	rgb[2] = Math.round(Math.random() * 255);
  
	// http://www.w3.org/TR/AERT#color-contrast
	const brightness = Math.round(((parseInt(rgb[0]) * 299) +
						(parseInt(rgb[1]) * 587) +
						(parseInt(rgb[2]) * 114)) / 1000);
	const textColour = (brightness > 125) ? '#202020' : '#e7e7e7';
	const backgroundColour = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
	return {textColour:textColour, backgroundColour:backgroundColour }
  }
  let Vals = setContrast();

  <style jsx global>{`
  body {
    background-color: ${Vals.backgroundColour};
    color: ${Vals.textColour};
  }
`}</style>


export const databaseId = process.env.NOTION_DATABASE_ID;
export default function Home({ posts }) {
	return (
		<div>
			<Head>
				<title>printer_scanner</title>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<div className="grid-layout condensed-grid">
				<div className="grid-item span-2"><Link href="/"><h1 className="logo">printer_scanner blog</h1></Link></div>
				<div className="grid-item span-2"></div>
				<div className="grid-item grid-item--link">
					<a className="right" href="https://instagram.com/printer_scanner">
						Instagram
					</a>
				</div>
				<div className="grid-item grid-item--link"><a href="https://printerscanner.net">↗ printer_scanner</a></div>
			</div>
			<div className="grid-layout">
				{posts.map((post) => {
					return (
						<div key={post.id} className="grid-item">
							<Link href={`/${post.properties.slug.rich_text[0]?.plain_text}`}>
								<p>
									<b><Text text={post.properties.Name.title} /></b>
								</p>

								{/* <p className="date">{post.properties.Year.number}</p> */}
								{/* <p>Read post →</p> */}
							</Link>
						</div>
					);
				})}
			</div>
			<footer>
      <br />
      <div className="grid-layout condensed-grid">
        <div className="grid-item span-2">
          <a href="mailto:contact@printerscanner.net">
            contact@printerscanner.net
          </a>
        </div>
				 <div className="grid-item span-2"></div>
				<div className="grid-item"><a href="https://www.are.na/printer-scanner">are.na</a></div>
				<div className="grid-item"><a className="right" href="https://instagram.com/printer_scanner">Instagram</a></div>
      </div>
      <br />
    </footer>
		</div>
	);
}

export const getStaticProps = async () => {
	const database = await getDatabase(databaseId);
	return {
		props: {
			posts: database,
		},
		revalidate: 1,
	};
};
