const jsonfile = require("jsonfile");
const wiki = require("wikipedia");

const nameSearch = "batman";

(async () => {
	try {
		const page = await wiki.page(nameSearch);
		const summary = await page.summary();
		const title = await summary.title.toLowerCase();

    jsonfile.writeFile(`./history/${title}.json`, summary.extract, function (err) {
      console.log(`${title}.json has been created!`)
      if (err) console.error(err)
    })

	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();