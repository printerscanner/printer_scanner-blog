import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";

export const databaseId = process.env.NOTION_DATABASE_ID;
export default function Home({ posts }) {
	return (
		<div>
			<Head>
				<title>printer_scanner</title>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<div className="grid-layout condensed-grid">
				<div className="grid-item"><Link href="/"><h1 className="logo">printer_scanner blog</h1></Link></div>
				<div className="grid-item span-3"></div>
				<div className="grid-item grid-item--link">
					<a className="right" href="https://instagram.com/printer_scanner">
						Instagram
					</a>
				</div>
				<div className="grid-item grid-item--link"><a href="https://printerscanner.net">↗ printer_scanner</a></div>
			</div>
			<div className="grid-layout">
				{posts.map((post) => {
					const date = new Date(post.created_time).toLocaleString(
						"en-US",
						{
							month: "short",
							day: "2-digit",
							year: "numeric",
						}
					);
					return (
						<div key={post.id} className="grid-item">
							<Link href={`/${post.id}`}>
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
