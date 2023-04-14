import React, { useEffect, useState } from "react"
import { backend_site, makeid } from "../../../controller/misc/misc"
import { read_user } from "../../../model/local/login_user"

const SellerProducts = () => {
	const [save_btn_hide, set_save_btn_hide] = useState("")
	const [add_picture_hide, set_add_picture_hide] = useState("d-none")
	const [categories, set_categories] = useState([])
	const [products, set_products] = useState([])
	const [product_id, set_product_id] = useState()
	const [product_category_id, set_product_category_id] = useState()
	const [product_description, set_product_description] = useState()
	const [product_specification, set_product_specification] = useState()
	const [product_unit_price, set_product_unit_price] = useState()
	const [product_unit, set_product_unit] = useState("pcs")
	const [product_qty, set_product_qty] = useState(0)
	const [product_qty_sold, set_product_qty_sold] = useState(0)
	const [ximage, set_ximage] = useState()
	const [product_pictures, set_product_pictures] = useState([])
	function save_picture_data(item_id, picture) {
		const a = {
			picturefile: "x",
			img: `${picture.url}`,
			product_id: item_id,
		}
		let str_data = JSON.stringify(a)
		console.log(str_data)
		fetch(backend_site + "/api/product_pictures", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: str_data,
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response)
			})
	}
	function save_product_item(cat_id, item) {
		read_user((user1) => {
			fetch(backend_site + "/api/products", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					category_id: cat_id,
					description: item.description.substring(0, 48),
					specs: item.specs.substring(0, 250),
					unit: "pcs",
					price: item.unit_price,
					onhand_qty: item.qty,
					sold_qty: item.sold,
					seller_id: user1.id,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.status > 0) {
						//set_product_id(response.data.id)
						console.log(response.data.id)
						for (let picture of item.images) {
							console.log("picture")
							console.log(picture)

							setTimeout(
								save_picture_data(response.data.id, picture),
								500
							)
						}
						//alert(response.msg)
						//window.location = "/login"
						//set_image_disabled(false)
					}
				})
		})
	}
	function save_bulk_products() {
		let products = [
			{
				on_sale: true,
				description: "NIV, Holy Bible New Testament",
				specs: "The NIV Holy Bible New Testament is a great tool to give to first-time Bible readers looking to discover God's Word",
				unit_price: 2800,
				discount_p: 30,
				qty: 11,
				sold: 2,
				review_rate: 5,
				main_image: "/assets/img/spiritual/spiritual0001_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0001_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "NIV, Beautiful Word Bible Journal",
				specs: "The NIV Beautiful Word Bible Journal, Revelation, includes the full text of the book of Revelation",
				unit_price: 2422,
				discount_p: 20,
				qty: 10,
				sold: 3,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0002_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0002_0001.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0002_0002.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0002_0003.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0002_0004.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0002_0005.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "NIV, Outreach New Testament, Large Print",
				specs: "A low-cost large print Bible perfect for churches, ministries, or individuals looking to share God’s Word.",
				unit_price: 100,
				discount_p: 20,
				qty: 100,
				sold: 20,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0003_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0003_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "The Berenstain Bears Easter Fun",
				specs: "The Berenstain Bears come to life this joyful Easter season with puzzles, activity pages, coloring pages",
				unit_price: 240,
				discount_p: 20,
				qty: 100,
				sold: 20,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0004_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0004_0001.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0004_0002.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0004_0003.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0004_0004.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0004_0005.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Jesus Calling: The Story of Easter (picture book)",
				specs: "Jesus Calling®: The Story of Easter from bestselling author Sarah Young uses storytelling from throughout the Bible, simple Bible verses, and short Jesus Calling® devotions to show kids how Easter was part of God's plan from the very beginning.",
				unit_price: 540,
				discount_p: 40,
				qty: 100,
				sold: 20,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0005_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0005_0001.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0005_0002.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0005_0003.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0005_0004.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0005_0005.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "The Easter Story for Children",
				specs: "In this beautifully illustrated Easter picture book from bestselling authors Max Lucado, Randy Frazee, and Karen Hill, kids learn about the death and resurrection of Jesus, whose story is filled with love for us all.",
				unit_price: 225,
				discount_p: 25,
				qty: 100,
				sold: 20,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0006_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0006_0001.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0006_0002.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0006_0003.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0006_0004.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "The Beginner's Bible Come Celebrate Easter",
				specs: "If your family is a fan of The Beginners Bible, your children will enjoy The Beginners Bible Come Celebrate Easter Sticker",
				unit_price: 240,
				discount_p: 25,
				qty: 100,
				sold: 30,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0007_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0007_0001.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0007_0002.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0007_0003.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0007_0004.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "The Beginner's Bible Come Celebrate Easter",
				specs: "If your family is a fan of The Beginners Bible, your children will enjoy The Beginners Bible Come Celebrate Easter",
				unit_price: 240,
				discount_p: 25,
				qty: 100,
				sold: 30,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0007_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0007_0001.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0007_0002.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0007_0003.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0007_0004.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "Twas the Morning of Easter",
				specs: "Celebrate the story of Jesus’ resurrection in a fresh way as beloved, bestselling author Glenys Nellist shares the Bible stories of the season in a familiar rhythm and rhyme that children will love, following the classic style of the iconic",
				unit_price: 540,
				discount_p: 50,
				qty: 100,
				sold: 30,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0008_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0008_0001.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0008_0002.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0008_0003.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0008_0004.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "Twas the Morning of Easter",
				specs: "Celebrate the story of Jesus’ resurrection in a fresh way as beloved, bestselling author Glenys Nellist shares the Bible stories of the season in a familiar rhythm and rhyme that children will love, following the classic style of the iconic 'Twas the Night Before Christmas.",
				unit_price: 540,
				discount_p: 50,
				qty: 100,
				sold: 30,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0008_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0008_0001.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0008_0002.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0008_0003.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"The Wonder of Creation: 100 More Devotions About God and Science",
				specs: "In this captivating follow-up to the bestselling kids' devotionals Indescribable and How Great Is Our God, discover more mind-blowing, faith-building scientific facts and biblical truths about the wonder of God's creation from author, speaker, and founder of the Passion movement Louie Giglio.",
				unit_price: 500,
				discount_p: 40,
				qty: 100,
				sold: 30,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0009_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0009_0001.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0009_0002.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0009_0003.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0009_0004.webp",
					},
					{
						url: "/assets/img/spiritual/spiritual0009_0004.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "40 Days With Jesus: Celebrating His Presence",
				specs: "Spend 40 days with Jesus—from the time leading up to His death on Good Friday to the celebration of His resurrection on Easter Sunday—and celebrate His presence as never before. Select devotions from Sarah Young’s bestselling Jesus Calling have been compiled to create an experience of closeness with the Savior during any time of the year.",
				unit_price: 100,
				discount_p: 20,
				qty: 80,
				sold: 50,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0010_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0010_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"He Gets Us: Experiencing the confounding love, forgiveness, and relevance of Jesus",
				specs: "Jesus understands our lives because he was human too. He faced the same hardships and personal struggles that we encounter on a daily basis. He felt our deepest sadness and experienced our darkest solitude.",
				unit_price: 500,
				discount_p: 20,
				qty: 70,
				sold: 40,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0011_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0011_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"The Prayer Code: 40 Scripture Prayers Every Believer Should Pray",
				specs: "Do you want a richer, more robust prayer life? Your prayers are powerful! Learn how to pray with confidence, faith, and an awareness of the Holy Spirit as you draw from world-changing prayers from Scripture in this inspiring guide to a transformed spiritual life.",
				unit_price: 450,
				discount_p: 20,
				qty: 80,
				sold: 50,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0012_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0012_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"At the Table with Jesus: 66 Days to Draw Closer to Christ and Fortify Your Faith",
				specs: "At the Table with Jesus invites readers to sixty-six days of rich engagements with the Good Shepherd, providing deeper truths, power, and connection to walk through life’s troubles. ",
				unit_price: 550,
				discount_p: 30,
				qty: 70,
				sold: 50,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0013_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0013_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"The Awe of God: The Astounding Way a Healthy Fear of God Transforms Your Life",
				specs: "Do you long for an intimate relationship with your Creator, but He seems elusive? Perhaps it is because something utterly essential is missing—the fear of the Lord. Don't let this frighten you.",
				unit_price: 950,
				discount_p: 55,
				qty: 60,
				sold: 60,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0014_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0014_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Turn My Mourning into Dancing: Finding Hope During Hard Times",
				specs: "In times of suffering, simple answers often ring empty and hollow--so how can you find hope in hard times? Learn how to survive the difficult seasons with the comfort and of God's constancy. With sensitive, practical advice, Henri Nouwen gently points you towards a life that is grounded in God’s companionship and rooted within eternal hope.",
				unit_price: 500,
				discount_p: 30,
				qty: 60,
				sold: 50,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0015_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0015_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "Hope for Each Day Morning and Evening Devotions",
				specs: "Beginning and ending your day with a daily devotional can be a game changer. Leading inspirational author and pastor Billy Graham shares words of wisdom and inspiration for hope-filled living with 730 devotions in Hope for Each Day: Morning and Evening Devotions.",
				unit_price: 875,
				discount_p: 50,
				qty: 60,
				sold: 40,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0016_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0016_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "100 Favorite Hymns",
				specs: "Cultivate a deeper appreciation for timeless hymns while drawing closer to God.",
				unit_price: 450,
				discount_p: 20,
				qty: 50,
				sold: 30,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0017_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0017_0001.webp",
					},

					{
						url: "/assets/img/spiritual/spiritual0017_0002.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Start with Prayer: 250 Prayers for Hope and Strength",
				specs: "Do you find it difficult to turn to prayer when you need it most? Do you have trouble finding the words to capture exactly how you’re feeling?  Start with Prayer, by pastor and New York Times bestselling author Max Lucado, will give you the tools you need to feel more comfortable when you communicate with God.",
				unit_price: 630,
				discount_p: 20,
				qty: 60,
				sold: 30,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0018_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0018_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Surrender Your Story: Ditch the Myth of Control and Discover Freedom in Trusting God",
				specs: "Popular podcaster and self-proclaimed control freak Tara Sun shows how having everything under control is overrated--not to mention downright dangerous--and reveals the surprising, lifegiving alternative: only radical surrender to God brings the peace and fulfillment we yearn for.",
				unit_price: 1000,
				discount_p: 90,
				qty: 30,
				sold: 20,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0019_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0019_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "What on Earth Am I Here For? Purpose Driven Life",
				specs: "An evangelistic booklet based on the first three chapters of the New York Times #1 bestselling book The Purpose Driven Life.",
				unit_price: 55,
				discount_p: 5,
				qty: 90,
				sold: 50,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0020_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0020_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Holy Roar: 7 Words That Will Change The Way You Worship",
				specs: "What happens when we praise God? What are the benefits of praising Him? Do you know what praise actually means?",
				unit_price: 560,
				discount_p: 25,
				qty: 70,
				sold: 50,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0021_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0021_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Promises for the Overcomer: 8 Essential Guarantees for Spiritual Victory",
				specs: "Jesus said, In the world you will have tribulation; but be of good cheer, I have overcome the world (John 16:33).As a disciple of Jesus Christ, you also have overcome the world.",
				unit_price: 140,
				discount_p: 5,
				qty: 80,
				sold: 20,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0022_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0022_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Pocket Prayers: 40 Simple Prayers that Bring Peace and Rest",
				specs: "Do you ever get distracted when you pray? Do your thoughts zig, then zag, then zig again—your head swarming with all the things you need to do that day? If so, there is hope.",
				unit_price: 140,
				discount_p: 15,
				qty: 90,
				sold: 30,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0023_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0023_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Praying the Scriptures for Your Life: 31 Days of Abiding in the Presence, Provision, and Power of God",
				specs: "Taking you on a 31-day journey rooted in Christ's words in John 15, Praying the Scriptures for Your Life will help you find guidance and peace as you pray through life's trickiest issues, from relationships to finances to what to do with the pain of unanswered prayer. Discover how Scripture can be experienced, not just read!",
				unit_price: 500,
				discount_p: 0,
				qty: 80,
				sold: 50,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0024_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0024_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Parables: The Mysteries of God's Kingdom Revealed Through the Stories Jesus Told",
				specs: "Have you ever wondered why Jesus often spoke in parables? Are you curious about what lessons we can learn from these parables today? Pastor and bestselling author John MacArthur breaks down the parables and teaches us how we can apply these deceptively simple stories to modern Christianity.",
				unit_price: 595,
				discount_p: 0,
				qty: 100,
				sold: 60,
				review_rate: 5,
				main_image: "/assets/img/spiritual/spiritual0025_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0025_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"The Apostles' Code: Unlocking the Power of God’s Spirit in Your Life",
				specs: "Do you have moments when you feel defeated, scared, or hopeless? Are you looking for a way to understand the work of the Holy Spirit and create a deeper relationship with Christ? Discover the power of the Holy Spirit in your life as bestselling author O",
				unit_price: 105,
				discount_p: 0,
				qty: 90,
				sold: 60,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0026_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0026_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Overcomer Bible Study Guide: Live a Life of Unstoppable Strength, Unmovable Faith, and Unbelievable Power",
				specs: "No matter what the world throws at us—anxiety, fear, confusion, temptation—we have a choice on how to respond. We can either concede defeat, or put on God's armor and overcome.",
				unit_price: 455,
				discount_p: 25,
				qty: 90,
				sold: 50,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0027_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0027_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Devotions from the Garden: Finding Peace and Rest from Your Hurried Life",
				specs: "Is the garden your happy place? Does gardening give you peace? Devotions from the Garden takes you to that place where dewdrops settle and butterflies gather to witness the miracles of God's creation bloom and grow.",
				unit_price: 600,
				discount_p: 40,
				qty: 90,
				sold: 60,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0028_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0028_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Captured By Grace: No One is Beyond the Reach of a Loving God",
				specs: "Timely and encouraging words to initiate a fresh experience of God's grace.",
				unit_price: 560,
				discount_p: 30,
				qty: 100,
				sold: 50,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0029_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0029_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Made to Crave: Satisfying Your Deepest Desire with God, Not Food",
				specs: "What would happen if you started listening to your cravings instead of trying to silence them? If you’re tired of the same old messages of eat less and move more, this book is what you’ve been missing. You know “how to” get healthy… but now there’s finally a book to help you find your “want to”- the lasting emotional and spiritual motivation to meet your goals and stay healthy.",
				unit_price: 700,
				discount_p: 70,
				qty: 85,
				sold: 40,
				review_rate: 4,
				main_image: "/assets/img/spiritual/spiritual0030_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0030_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Sitting at the Feet of Rabbi Jesus: How the Jewishness of Jesus Can Transform Your Faith",
				specs: "Have you ever wondered what it would be like to journey back to the first century and sit at the feet of Rabbi Jesus as one of his Jewish disciples? Join Ann Spangler and Lois Tverberg as they share a rare opportunity to know Jesus as his first disciples did.",
				unit_price: 590,
				discount_p: 100,
				qty: 50,
				sold: 30,
				review_rate: 5,
				main_image: "/assets/img/spiritual/spiritual0031_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0031_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Good Boundaries and Goodbyes: Loving Others Without Losing the Best of Who You Are",
				specs: "Relationships are wonderful . . . until they're not. Join #1 New York Times bestselling author Lysa TerKeurst as she helps you stop the dysfunction of unhealthy relationships by showing you biblical ways to set boundaries--and, when necessary, say goodbye--without losing the best of who you are.",
				unit_price: 1115,
				discount_p: 300,
				qty: 40,
				sold: 30,
				review_rate: 5,
				main_image: "/assets/img/spiritual/spiritual0032_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0032_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"It's Not Supposed to Be This Way: Finding Unexpected Strength When Disappointments Leave You Shattered",
				specs: "New York Times bestselling author Lysa TerKeurst unveils her heart amid shattering circumstances and shows readers how to live assured when life doesn't turn out like they expected.",
				unit_price: 1115,
				discount_p: 300,
				qty: 50,
				sold: 40,
				review_rate: 5,
				main_image: "/assets/img/spiritual/spiritual0033_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0033_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"All You Want to Know About Hell: Three Christian Views of God's Final Solution to the Problem of Sin",
				specs: "It is an undeniable fact that the very concept of hell is shrouded in mystery. Is hell simply a place where sinners are sent to suffer for their sins, or is it much, much more than that?",
				unit_price: 700,
				discount_p: 210,
				qty: 50,
				sold: 40,
				review_rate: 0,
				main_image: "/assets/img/spiritual/spiritual0034_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0034_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Anxious for Nothing Bible Study Guide: Finding Calm in a Chaotic World",
				specs: "The Anxious for Nothing Study Guide provides individuals and small groups with a roadmap for overcoming anxiety and finding lasting peace.",
				unit_price: 455,
				discount_p: 136,
				qty: 50,
				sold: 40,
				review_rate: 5,
				main_image: "/assets/img/spiritual/spiritual0035_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0035_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"The Scandal of Forgiveness: Grace Put to the Test",
				specs: "Forgiveness offers an alternative to an endless cycle of resentment and revenge, but do you really understand forgiveness? In The Scandal of Forgiveness bestselling author Philip Yancey will answer: What is forgiveness; Why is forgiveness so difficult; Why is forgiveness scandalous; and What does God have to do with forgiveness?",
				unit_price: 525,
				discount_p: 158,
				qty: 50,
				sold: 50,
				review_rate: 0,
				main_image: "/assets/img/spiritual/spiritual0036_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0036_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"The Power to Change: Mastering the Habits That Matter Most",
				specs: "Feeling stuck no matter how hard you try to make positive changes in your life? You can start living the life you want through the practical, biblical, and highly doable strategies in The Power to Change.",
				unit_price: 1015,
				discount_p: 305,
				qty: 60,
				sold: 50,
				review_rate: 5,
				main_image: "/assets/img/spiritual/spiritual0037_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0037_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description: "100 Favorite Bible Verses",
				specs: "Discover the life-changing power of Scripture with 100 of the best-loved Bible verses that bring encouragement, direction, insight, and hope for your life.",
				unit_price: 360,
				discount_p: 108,
				qty: 95,
				sold: 40,
				review_rate: 5,
				main_image: "/assets/img/spiritual/spiritual0038_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0038_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"Springs in the Valley: 365 Daily Devotional Readings",
				specs: "Springs in the Valley has been refreshing to the souls of believers for the past 60 years, and this updated price-conscious edition brings timeless messages of hope to existing fans and new readers alike.",
				unit_price: 350,
				discount_p: 105,
				qty: 80,
				sold: 20,
				review_rate: 5,
				main_image: "/assets/img/spiritual/spiritual0039_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0039_0001.webp",
					},
				],
			},

			{
				on_sale: false,
				description:
					"The Secret Place of Thunder: Trading Our Need to Be Noticed for a Hidden Life with Christ",
				specs: "Jesus teaches us to live, not for the eyes of others or even for ourselves, but in the secret place where our Father in heaven sees and rewards.",
				unit_price: 700,
				discount_p: 210,
				qty: 60,
				sold: 10,
				review_rate: 0,
				main_image: "/assets/img/spiritual/spiritual0040_0001.webp",
				images: [
					{
						url: "/assets/img/spiritual/spiritual0040_0001.webp",
					},
				],
			},
		]
		//save_product_item(1, products[9])
		for (let item of products) {
			save_product_item(1, item)
		}
	}
	function display_products() {
		let user = null
		read_user((user1) => (user = user1))
		fetch(backend_site + "/api/categories", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				set_categories(response.data)
			})

		let xximages = []
		fetch(backend_site + "/api/product_pictures", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response2) => response2.json())
			.then((response2) => {
				console.log(response2.data)
				xximages = response2.data
				fetch(backend_site + "/api/products", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
					.then((response) => response.json())
					.then((response) => {
						let products = response.data.filter(
							(x) => x.seller_id === user.id
						)
						for (let item of products) {
							let a = xximages.filter(
								(x) => x.product_id === item.id
							)
							item.images = []
							if (a.length > 0) {
								console.log("sssssssss a[0].img")
								console.log(a[0].img)
								item.main_image = a[0].img
								item.images = a
								console.log("sssssssss a[0].n")
								console.log(a)
								///set_products(response.data)
							}
						}
						set_products(products)
						console.log(response.data)
					})
			})
	}
	useEffect(() => {
		//save_bulk_products()
		// on load
		display_products()
	}, [])
	function openProductForModification(item) {
		console.log("openProductForModification")
		set_product_id(item.id)
		set_product_pictures(item.images)
		set_product_category_id(item.category_id)
		set_product_description(item.description)
		set_product_specification(item.specs)
		set_product_unit(item.unit)
		set_product_unit_price(item.price)
		set_product_qty(item.onhand_qty)
		set_product_qty_sold(item.sold_qty)
	}
	function saveModProduct() {
		let user = null
		read_user((user1) => (user = user1))
		fetch(backend_site + "/api/products/" + product_id, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				category_id: product_category_id,
				description: product_description,
				specs: product_specification,
				unit: product_unit,
				price: product_unit_price,
				onhand_qty: product_qty,
				sold_qty: product_qty_sold,
				seller_id: user.id,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status > 0) {
					set_product_id(response.data.id)
					console.log(response.data.id)
					alert(response.msg)
					//window.location = "/login"
					//set_image_disabled(false)
				} else alert(response.msg.join("\n"))
			})
	}
	function saveNewProduct() {
		let user = null
		read_user((user1) => (user = user1))
		set_add_picture_hide("")
		set_save_btn_hide("d-none")
		fetch(backend_site + "/api/products", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				category_id: product_category_id,
				description: product_description,
				specs: product_specification,
				unit: product_unit,
				price: product_unit_price,
				onhand_qty: product_qty,
				sold_qty: product_qty_sold,
				seller_id: user.id,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status > 0) {
					set_product_id(response.data.id)
					console.log(response.data.id)
					alert(response.msg)
					//window.location = "/login"
					//set_image_disabled(false)
				} else alert(response.msg.join("\n"))
			})
	}

	function refreshProductPictures(source_product_id) {
		fetch(backend_site + "/api/product_pictures", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response.data)
				set_product_pictures(
					response.data.filter(
						(x) => x.product_id === source_product_id
					)
				)
			})
	}
	function deleteProductBtn(item) {
		fetch(backend_site + `/api/products/${item.id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				refreshProductPictures(product_id)
				alert(`Deleted product: ${item}`)
				display_products()
			})
	}
	function deleteProductPicture(picture) {
		fetch(backend_site + `/api/product_pictures/${picture.id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				refreshProductPictures(product_id)
				alert(`Deleted product picture: ${picture.img}`)
			})
	}
	const setImagePath = (e) => {
		let reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
		reader.onload = () => {
			set_ximage(reader.result)
		}
	}
	// images file picker
	useEffect(() => {
		if (ximage !== null && ximage !== undefined) {
			const a = {
				picturefile: ximage,
				img: `${backend_site}/img/${makeid(40)}.jpg`,
				product_id: product_id,
			}
			let str_data = JSON.stringify(a)
			console.log(str_data)
			fetch(backend_site + "/api/product_pictures", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: str_data,
			})
				.then((response) => response.json())
				.then((response) => {
					//console.log(response)
					//console.log(response)
					if (response.status > 0) {
						refreshProductPictures(product_id)
						//set_profile_picture(response.data.img)
						//set_image_disabled(false)
						//set_image_changed(false)
						alert(response.msg)
						//set_participant_id(response.data.id)
						//console.log(response.data.id)
						//alert(response.msg)
						//window.location = "/login"
					} //else alert(response.msg.join("\n"))
				})
		}
	}, [ximage])
	return (
		<>
			<br />
			<div style={{ position: "relative" }}>
				<div className="container mb-3 mt-5">
					<br />
					<div className="row">
						<div className="col-md-12" style={{ height: 35 }}>
							<h2 style={{ float: "left", color: "beige" }}>
								<b>
									<span className="text-wrap">
										<i className="bi bi-shop"></i>
										&nbsp; Product Listings
									</span>{" "}
								</b>
							</h2>
							<button
								className="btn btn-outline-success float-end"
								data-bs-toggle="modal"
								data-bs-target="#exampleModal-add-item">
								<i className="bi bi-smartwatch"></i> New Product
							</button>
						</div>
						<div className="col-md-12">
							<hr />
						</div>
					</div>
					<div
						className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3"
						id="buyer-stores-list">
						{products.map((item) => (
							<>
								<div
									key={item.id}
									className="col mb-3"
									style={{ color: "gray" }}>
									<div
										className="card mb-3 border-1 p-0 position-relative shadow mx-auto"
										style={{ width: 250 }}>
										{/* Modal Trigger */}
										<div
											className="image-selection mx-auto"
											style={{
												height: 150,
												width: "100%",
												overflow: "hidden",
											}}>
											<img
												width="100%"
												src={`${item.main_image}`}
												alt="${item.description}"
												style={{ minHeight: 150 }}
												data-bs-toggle="modal"
												data-bs-target={`#staticBackdrop-${item.id}`}
											/>
										</div>
										<div
											className="card-body"
											align="center"
											style={{ paddingTop: 1 }}>
											<h4
												className="d-flex align-middle card-title"
												style={{
													height: 30,
													overflowY: "hidden",
													marginBottom: 1,
												}}>
												(#{item.id}) {item.description}
											</h4>

											<p
												className="card-text"
												style={{
													height: 75,
													overflowY: "hidden",
													marginBottom: 0,
												}}>
												{item.specs}
											</p>
											<h4
												className="text-warning"
												style={{
													height: 30,
													overflowY: "hidden",
													whiteSpace: "nowrap",
													marginBottom: 0,
												}}>
												{" "}
												<b>
													{" "}
													<i>
														{" "}
														₱{" "}
														{item.price.toLocaleString()}{" "}
													</i>{" "}
												</b>{" "}
											</h4>

											<div
												align="center"
												className="d-flex flex-row justify-content-center"
												style={{
													height: 30,
													padding: 0,
												}}>
												<div className="p-1">
													{" "}
													Sold{" "}
													<span className="badge bg-success">
														{item.sold_qty}
													</span>{" "}
												</div>
												<div className="p-1">
													{" "}
													Available{" "}
													<span className="badge bg-danger">
														{item.onhand_qty -
															item.sold_qty}
													</span>{" "}
												</div>
											</div>

											<div className="row g-1">
												<div className="col-6">
													<button
														type="button"
														className="btn btn-outline-danger"
														data-bs-toggle="modal"
														data-bs-target={`#staticBackdrop2-${item.id}`}>
														<i className="bi bi-eraser" />
														<br />
														Remove Product
													</button>
												</div>
												<div className="col-6">
													<button
														onClick={() =>
															openProductForModification(
																item
															)
														}
														type="button"
														className="btn btn-outline-secondary"
														data-bs-toggle="modal"
														data-bs-target={`#exampleModal-mod-item-${item.id}`}>
														<i className="bi bi-pen" />
														<br />
														Modify Product
													</button>
												</div>
											</div>
										</div>
									</div>
									{/* Show Images Modal */}
									<div
										className="modal fade"
										id={`staticBackdrop-${item.id}`}
										data-bs-backdrop="static"
										data-bs-keyboard="false"
										tabIndex={-1}
										aria-labelledby="staticBackdropLabel"
										aria-hidden="true">
										<div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
											<div className="modal-content">
												<div className="modal-header bg-primary-subtle">
													<h5
														className="modal-title"
														id="staticBackdropLabel">
														{item.description}
													</h5>
													<button
														type="button"
														className="btn-close"
														data-bs-dismiss="modal"
														aria-label="Close"
													/>
												</div>
												<div className="modal-body">
													{item.images.map(
														(file, i) => (
															<>
																<img
																	key={i}
																	width="100%"
																	src={`${file.img}`}
																	alt="${file}"
																/>
																<br />
																<br />
															</>
														)
													)}
												</div>
												<div className="modal-footer">
													<button
														className="btn btn-outline-danger "
														data-bs-dismiss="modal">
														Close
													</button>
												</div>
											</div>
										</div>
									</div>
									{/* Delete Product Modal */}
									<div
										className="modal fade"
										id={`staticBackdrop2-${item.id}`}
										data-bs-backdrop="static"
										data-bs-keyboard="false"
										tabIndex={-1}
										aria-labelledby="staticBackdropLabel"
										aria-hidden="true">
										<div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
											<div className="modal-content">
												<div className="modal-header bg-danger">
													<h5
														className="modal-title text-white"
														id="staticBackdropLabel">
														Are you sure you want to
														DELETE{" "}
														{item.description}{" "}
														Product?
													</h5>
													<button
														type="button"
														className="btn-close"
														data-bs-dismiss="modal"
														aria-label="Close"
													/>
												</div>
												<div className="modal-body">
													{item.images[0] ? (
														<>
															<img
																width="100%"
																src={`${item.images[0].img}`}
																alt="xxx"
															/>
														</>
													) : (
														<></>
													)}

													<br />
													<br />
												</div>
												<div className="modal-footer">
													<button
														onClick={() =>
															deleteProductBtn(
																item
															)
														}
														className="btn btn-outline-danger "
														data-bs-dismiss="modal">
														YES
													</button>
												</div>
											</div>
										</div>
									</div>
									{/* Modify/Edit Products Modal */}
									<div
										className="modal fade text-black"
										id={`exampleModal-mod-item-${item.id}`}
										tabIndex={-1}
										aria-labelledby="exampleModalLabel-add-item"
										aria-hidden="true">
										<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
											<div className="modal-content">
												<div className="modal-header bg-secondary text-white">
													<h1
														className="modal-title fs-5"
														id="exampleModalLabel-add-item">
														<i className="bi bi-postcard" />{" "}
														| Modify Product
														Registry Form
													</h1>
													<button
														onClick={() =>
															display_products()
														}
														type="button"
														className="btn-close"
														data-bs-dismiss="modal"
														aria-label="Close"
													/>
												</div>
												<div className="modal-body">
													<div className="container-fluid">
														<div className="row g-2">
															<div className="col-md-8">
																<div className="form-floating col-md-12">
																	<select
																		defaultValue={
																			item.category_id
																		}
																		type="text"
																		className="form-control"
																		id="category_id"
																		name="category_id"
																		placeholder="#"
																		onChange={(
																			e
																		) =>
																			set_product_category_id(
																				e
																					.target
																					.value
																			)
																		}
																		required>
																		<option>
																			Non-selected
																		</option>
																		{categories.map(
																			(
																				category
																			) => (
																				<>
																					<option
																						key={
																							category.id
																						}
																						value={
																							category.id
																						}>
																						{
																							category.name
																						}
																					</option>
																				</>
																			)
																		)}
																	</select>
																	<label htmlFor="category_id">
																		Category
																		Name
																	</label>
																</div>
																<br />
																<div className="form-floating col-md-12">
																	<input
																		defaultValue={
																			item.description
																		}
																		onChange={(
																			e
																		) =>
																			set_product_description(
																				e
																					.target
																					.value
																			)
																		}
																		type="text"
																		className="form-control"
																		id="description"
																		name="description"
																		placeholder="#"
																		required
																	/>
																	<label htmlFor="description">
																		Description/Name
																	</label>
																</div>
																<br />
																<div className="form-floating col-md-12">
																	<textarea
																		defaultValue={
																			item.specs
																		}
																		onChange={(
																			e
																		) =>
																			set_product_specification(
																				e
																					.target
																					.value
																			)
																		}
																		type="text"
																		className="form-control"
																		id="specs"
																		name="specs"
																		placeholder="#"
																		required
																	/>
																	<label htmlFor="specs">
																		Product
																		Specification
																	</label>
																</div>
																<br />
																<div className="row g-3">
																	<div className="col-sm-6">
																		<div className="form-floating">
																			<input
																				defaultValue={
																					item.price
																				}
																				onChange={(
																					e
																				) =>
																					set_product_unit_price(
																						e
																							.target
																							.value
																					)
																				}
																				type="number"
																				className="form-control"
																				id="unit_price"
																				name="unit_price"
																				placeholder="#"
																				required
																			/>
																			<label htmlFor="unit_price">
																				Unit
																				Price
																				PhP
																			</label>
																		</div>
																	</div>
																	<div className="col-sm-6">
																		<div className="form-floating">
																			<input
																				defaultValue={
																					item.unit
																				}
																				onChange={(
																					e
																				) =>
																					set_product_unit(
																						e
																							.target
																							.value
																					)
																				}
																				type="text"
																				className="form-control"
																				id="unit"
																				name="unit"
																				placeholder="#"
																				required
																			/>
																			<label htmlFor="discount_p">
																				Unit
																			</label>
																		</div>
																	</div>
																</div>
																<br />
																<div className="row g-3">
																	<div className="col-sm-6">
																		<div className="form-floating">
																			<input
																				defaultValue={
																					item.onhand_qty
																				}
																				onChange={(
																					e
																				) =>
																					set_product_qty(
																						e
																							.target
																							.value
																					)
																				}
																				type="number"
																				className="form-control"
																				id="qty"
																				name="qty"
																				placeholder="#"
																				required
																			/>
																			<label htmlFor="qty">
																				Actual
																				On-hand
																				Qty
																			</label>
																		</div>
																	</div>
																	<div className="col-md-6">
																		<div className="form-floating">
																			<input
																				defaultValue={
																					item.sold_qty
																				}
																				onChange={(
																					e
																				) =>
																					set_product_qty_sold(
																						e
																							.target
																							.value
																					)
																				}
																				type="number"
																				className="form-control"
																				id="sold"
																				name="sold"
																				placeholder="#"
																				required
																			/>
																			<label htmlFor="sold">
																				Sold
																				Qty
																			</label>
																		</div>
																	</div>
																</div>
															</div>
															<div
																className="col-md-4 border border-start-2 border-end-0 border-top-0 border-bottom-0"
																id="product-image-div">
																<div
																	className={`form-floating col-md-12 mb-3`}>
																	<input
																		onChange={(
																			e
																		) => {
																			setImagePath(
																				e
																			)
																		}}
																		type="file"
																		accept=".jpg"
																		className={`form-control`}
																		id="product-image-filename1"
																		placeholder="#"
																		required
																	/>
																	<label
																		htmlFor="first_name"
																		className="mb-1">
																		<i className="bi bi-camera" />
																		Add a
																		Product
																		Picture
																	</label>
																</div>
																<div id="list of pictures">
																	{product_pictures.length <
																	1 ? (
																		<div>
																			<div className="mx-auto w-100">
																				<img
																					width="100%"
																					className="img-thumbnail"
																					src="/assets/view/img/user.jpg"
																					alt="please select a category"
																					srcSet=""
																					id="product-image"
																				/>
																			</div>
																			<div
																				className="mx-auto  mb-3"
																				style={{
																					width: 15,
																				}}>
																				<button
																					type="button"
																					className="btn btn-outline-secondary border border-0"
																					style={{
																						padding: 0,
																					}}
																					disabled>
																					{" "}
																					<i className="bi bi-trash" />{" "}
																				</button>
																			</div>
																		</div>
																	) : (
																		<></>
																	)}

																	{product_pictures.map(
																		(
																			picture
																		) => (
																			<div
																				key={
																					picture.id
																				}>
																				<div className="mx-auto w-100">
																					<img
																						width="100%"
																						className="img-thumbnail"
																						src={`${picture.img}`}
																						alt="please select a product"
																						srcSet=""
																					/>
																				</div>
																				<div
																					className="mx-auto  mb-3"
																					style={{
																						width: 15,
																					}}>
																					<button
																						onClick={() =>
																							deleteProductPicture(
																								picture
																							)
																						}
																						type="button"
																						className="btn btn-outline-danger border border-0"
																						style={{
																							padding: 0,
																						}}>
																						{" "}
																						<i className="bi bi-trash" />{" "}
																					</button>
																				</div>
																			</div>
																		)
																	)}
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="modal-footer">
													<button
														onClick={() =>
															display_products()
														}
														type="button"
														className="btn btn-secondary"
														data-bs-dismiss="modal">
														Close
													</button>
													<button
														className={`btn btn-primary ${save_btn_hide}`}
														onClick={() =>
															saveModProduct()
														}>
														&nbsp;&nbsp;
														<i className="bi bi-database-add" />
														&nbsp; Save &nbsp;&nbsp;
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						))}
						{products.length < 1 ? (
							<>
								<br />
								<h1>
									No Products Available&nbsp;&nbsp;
									<div
										className="spinner-border"
										role="status">
										<span className="visually-hidden">
											Loading...
										</span>
									</div>
								</h1>
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
							</>
						) : (
							<></>
						)}
					</div>
				</div>
				{/* Add Products Modal */}
				<div
					className="modal fade text-black"
					id="exampleModal-add-item"
					tabIndex={-1}
					aria-labelledby="exampleModalLabel-add-item"
					aria-hidden="true">
					<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
						<div className="modal-content">
							<div className="modal-header bg-success text-white">
								<h1
									className="modal-title fs-5"
									id="exampleModalLabel-add-item">
									<i className="bi bi-postcard" /> | New
									Product Registry Form
								</h1>
								<button
									onClick={() => display_products()}
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								/>
							</div>
							<div className="modal-body">
								<div className="container-fluid">
									<div className="row g-2">
										<div className="col-md-8">
											<div className="form-floating col-md-12">
												<select
													type="text"
													className="form-control"
													id="category_id"
													name="category_id"
													placeholder="#"
													onChange={(e) =>
														set_product_category_id(
															e.target.value
														)
													}
													required>
													<option>
														Non-selected
													</option>
													{categories.map(
														(category) => (
															<>
																<option
																	key={
																		category.id
																	}
																	value={
																		category.id
																	}>
																	{
																		category.name
																	}
																</option>
															</>
														)
													)}
												</select>
												<label htmlFor="category_id">
													Category Name
												</label>
											</div>
											<br />
											<div className="form-floating col-md-12">
												<input
													onChange={(e) =>
														set_product_description(
															e.target.value
														)
													}
													type="text"
													className="form-control"
													id="description"
													name="description"
													placeholder="#"
													required
												/>
												<label htmlFor="description">
													Description/Name
												</label>
											</div>
											<br />
											<div className="form-floating col-md-12">
												<textarea
													onChange={(e) =>
														set_product_specification(
															e.target.value
														)
													}
													type="text"
													className="form-control"
													id="specs"
													name="specs"
													placeholder="#"
													required
													defaultValue={""}
												/>
												<label htmlFor="specs">
													Product Specification
												</label>
											</div>
											<br />
											<div className="row g-3">
												<div className="col-sm-6">
													<div className="form-floating">
														<input
															onChange={(e) =>
																set_product_unit_price(
																	e.target
																		.value
																)
															}
															type="number"
															className="form-control"
															id="unit_price"
															name="unit_price"
															placeholder="#"
															required
														/>
														<label htmlFor="unit_price">
															Unit Price PhP
														</label>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-floating">
														<input
															onChange={(e) =>
																set_product_unit(
																	e.target
																		.value
																)
															}
															type="text"
															className="form-control"
															id="unit"
															name="unit"
															placeholder="#"
															defaultValue="pcs"
															required
														/>
														<label htmlFor="discount_p">
															Unit
														</label>
													</div>
												</div>
											</div>
											<br />
											<div className="row g-3">
												<div className="col-sm-6">
													<div className="form-floating">
														<input
															onChange={(e) =>
																set_product_qty(
																	e.target
																		.value
																)
															}
															type="number"
															className="form-control"
															id="qty"
															name="qty"
															placeholder="#"
															required
														/>
														<label htmlFor="qty">
															Actual On-hand Qty
														</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-floating">
														<input
															onChange={(e) =>
																set_product_qty_sold(
																	e.target
																		.value
																)
															}
															type="number"
															className="form-control"
															id="sold"
															name="sold"
															placeholder="#"
															defaultValue="0"
															required
														/>
														<label htmlFor="sold">
															Sold Qty
														</label>
													</div>
												</div>
											</div>
										</div>
										<div
											className="col-md-4 border border-start-2 border-end-0 border-top-0 border-bottom-0"
											id="product-image-div">
											<div
												className={`form-floating col-md-12 mb-3 ${add_picture_hide}`}>
												<input
													onChange={(e) => {
														setImagePath(e)
													}}
													type="file"
													accept=".jpg"
													className={`form-control`}
													id="product-image-filename1"
													placeholder="#"
													required
												/>
												<label
													htmlFor="first_name"
													className="mb-1">
													<i className="bi bi-camera" />
													Add a Product Picture
												</label>
											</div>
											<div id="list of pictures">
												{product_pictures.length < 1 ? (
													<div>
														<div className="mx-auto w-100">
															<img
																width="100%"
																className="img-thumbnail"
																src="/assets/view/img/user.jpg"
																alt="please select a category"
																srcSet=""
																id="product-image"
															/>
														</div>
														<div
															className="mx-auto  mb-3"
															style={{
																width: 15,
															}}>
															<button
																type="button"
																className="btn btn-outline-secondary border border-0"
																style={{
																	padding: 0,
																}}
																disabled>
																{" "}
																<i className="bi bi-trash" />{" "}
															</button>
														</div>
													</div>
												) : (
													<></>
												)}

												{product_pictures.map(
													(picture) => (
														<div key={picture.id}>
															<div className="mx-auto w-100">
																<img
																	width="100%"
																	className="img-thumbnail"
																	src={`${picture.img}`}
																	alt="please select a product"
																	srcSet=""
																/>
															</div>
															<div
																className="mx-auto  mb-3"
																style={{
																	width: 15,
																}}>
																<button
																	onClick={() =>
																		deleteProductPicture(
																			picture
																		)
																	}
																	type="button"
																	className="btn btn-outline-danger border border-0"
																	style={{
																		padding: 0,
																	}}>
																	{" "}
																	<i className="bi bi-trash" />{" "}
																</button>
															</div>
														</div>
													)
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									onClick={() => display_products()}
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal">
									Close
								</button>
								<button
									className={`btn btn-primary ${save_btn_hide}`}
									onClick={() => saveNewProduct()}>
									&nbsp;&nbsp;
									<i className="bi bi-database-add" />
									&nbsp; Save &nbsp;&nbsp;
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SellerProducts
