const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Agus Marsono'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Agus Marsono'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        email: 'help@mywebsite.org',
        name: 'Agus Marsono'
    })
})

app.get('/study', (req, res) => {
    res.render('study', {
        title: 'Study',
        email: 'help@mywebsite.org',
        name: 'Agus Marsono',
        topics: [
            'Real Property Characteristics',
            'Freehold Estates',
            'Real Estate Ownership',
            'Land and Property Descriptions',
            'Monetary and Non-Monetary Incumbrances',
            'Local, State, and other Government Restrictions',
            'Real Property Liens',
            'Agency and Agency Relationships',
            'Real Estate Brokerage',
            'Buyer and Listing Agency Agreements',
            'Contract Law',
            'Transfer of Property Title',
            'Financing Principles',
            'Property Management',
            'Leasing',
            'Appraisals',
            'Investment Analysis',
            'Real Property Environmental Issues',
            'Settlement'
        ],
        terms: [
            "<strong>Equity</strong> = The <strong>difference</strong> between the market value of your home, and the amount you owe the lender who holds the mortgage.",
            "<strong>Purchase Agreement</strong> = A contract that legally binds two or more parties together, to specific obligations, that create a legally binding contract between the buyer and the seller.",
            "<strong>Variance</strong> = An individual seeking to be excused from the requirements of a zoning ordinance needs a (variance). A variance is a request to deviate from current zoning requirements. If granted, it permits the owner to use his land in a way that is ordinarily not permitted by the zoning ordinance.",
            "<strong>Lien</strong> = A legal claim on an asset.",
            "<strong>Mortgage Lien</strong> = A legal form of security to guarantee payment of a debt using property as collateral.",
            "EPA = Environmental Protection Agency. The agency that enforces all federal environmental rules and regulations.",
            "The Fair Housing Act of 1968 = Prohibited discrimination concerning the sale, rental, and financing of housing based on race, religion, national origin or sex.",
            "Mortgage Points = Fees paid directly to the lender in exchange for a reduced interest rate.",
            "Business Structures include Sole Proprietorship, Partnership, LLC, Corporation (C/S/B Corp).",
            "Condominiums (condos, common interest development) = Privately owned individual unit within a building of other units. Condo owners jointly own shared common areas, such as pools, garages, elevators, outside hallways, and gyms.",
            "Real Estate Police Power = This is how the government regualtes real estate. Examples of police power include zoning laws, building codes, fire codes, rent control, safety hazards, and tenant rights. No compensation needs to be paid for the implementation of police power."
        ],
        terms2: [
            "<strong>Three Types of Listing (contractual) Agreements</strong>: Open Listing, Exclusive Agency Listing, and Exclusive Right-to-Sell Listing.",
            "Basic Contractual Agreement (BSA) = A contractual agreement under which the listing broker acts as the agent or as the legally recognized non-agency representative of the seller(s), and <strong>the seller(s) agrees to pay a commission to the listing broker... </strong> --<i>for the purpose of shortening the definitions below!</i>",
            "<strong>Open-Listing</strong> = BSA only if the property is sold through the efforts of the listing broker. (Amended 5/06)",
            "<strong>Exclusive Agency Listing</strong> = BSA if the property is sold through the efforts of any real estate broker. If the property is sold solely through the efforts of the seller(s), the seller(s) is NOT obligated to pay a commission to the listing broker. (Amended 5/06)",
            "<strong>Exclusive Right-to-Sell Listing</strong> = BSA, regardless of whether the property is sold through the efforts of the listing broker, the seller(s), or anyone else; and except that the seller(s) may name one or more individuals or entities as exemptions in the listing agreement and if the property is sold to any exempted individual or entity, the seller(s) is not obligated to pay a commission to the listing broker. (Amended 5/06)",
            "Traditionally real estate agents are paid through a fee paid for performing a transaction, called a <strong>commission</strong>.",
            "<strong>Closing costs</strong> = Fees that the buyer pays to close the deal are called.",
            "<strong>Depreciation</strong> = Any loss in the value of a property over time from any cause.",
            "<strong>Three Main Forms of Depreciation</strong> = Economic Obsolescence, Functional Obsolescence, and Physical Deterioration.",
            "<strong>Partition</strong> = An act, by a court order, to divide up a concurrent estate into separate portions representing interests of the owners of a property. A legal way to dissolve the relationship when the parties don't voluntarily agree to its termination."
        ],
        terms3: [
            "Appraisal = An appraisal is an unbiased professional opinion of the value of a home and is used whenever a mortgage is involved in the buying, refinancing, or selling of that property.",
            "Appraisal Process = It is based on a number of factors and appraisers usually use a combination of approaches but give weight to the most the most important. It is then used to calculate or identify the market value of the property.",
            "Three Approaches in the Appraisal Process = the Sales Comparison Approach, the Cost Approach, and the Income Approach.",
            "The Sales Comparison Approach = Comparing a property's characteristics with those of comparable properties that have recently sold in similar transactions.",
            "The Cost Approach = The buyer will not pay more for a property than it would cost to build an equivalent.",
            "The Income Approach = Usually used in commercial real estate appraisal and in business appraisal.",
            "Homeowner Insurance = Homeowner insurance is property insurance that covers losses and damages. The cover an individual's house and assets in the home. It may also provide liability coverage against accidents in the home or on the property.",
            "Radon = Radioactive gas dispersed from natual decay of mineral in earth (odorless, colorless, tasteless)."

        ]
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term. '
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            //console.log(req.query.address)
            res.send({
                weather: forecastdata,
                location,
                address: req.query.address
            })
        })
    })

    // console.log(req.query.address)
    // res.send({
    //     weather: forecastdata,
    //     address: req.query.address
    // })
})

// app.com
// app.com/help
// app.com/about

// Below must be defined after all other app.get are defined.  

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Agus',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})