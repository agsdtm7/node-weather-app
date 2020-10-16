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
            "<strong>Appraisal</strong> = An appraisal is an unbiased professional opinion of the value of a home and is used whenever a mortgage is involved in the buying, refinancing, or selling of that property.",
            "<strong>Appraisal Process</strong> = It is based on a number of factors and appraisers usually use a combination of approaches but give weight to the most the most important. It is then used to calculate or identify the market value of the property.",
            "<strong>Three Approaches in the Appraisal Process</strong> = the Sales Comparison Approach, the Cost Approach, and the Income Approach.",
            "<strong>The Sales Comparison Approach</strong> = Comparing a property's characteristics with those of comparable properties that have recently sold in similar transactions.",
            "<strong>The Cost Approach</strong> = The buyer will not pay more for a property than it would cost to build an equivalent.",
            "<strong>The Income Approach</strong> = Usually used in commercial real estate appraisal and in business appraisal.",
            "<strong>Homeowner Insurance</strong> = Homeowner insurance is property insurance that covers losses and damages. The cover an individual's house and assets in the home. It may also provide liability coverage against accidents in the home or on the property.",
            "<strong>Home Inspection</strong> = An examination of a property's safety and current condition, from its foundation to its roof and including its various systems (electrical, plumbing, and more).",
            "<strong>Radon</strong> = Radioactive gas dispersed from natual decay of mineral in earth (odorless, colorless, tasteless).",
            "<strong>Asbestos</strong> = Fibrous material derived from a naturally occurring group of minerals commonly used in insulation. Asbestos fibers released into the air are carcinogenic (causing cancer).",
            "<strong>Parcel</strong> = A specific tract of land.",
        ],
        terms4: [
            "<strong>Abandonment</strong> = The failure to occupy and use property, which may result in a loss of rights.",
            "<strong>Abstract of Title</strong> = A brief summary of the history of title to a property, listing all recorded documents that affect the title.",
            "<strong>Abutting Property</strong> = Directly contiguous properties, sharing at least one common boundary",
            "<strong>Acceleration Clause</strong> = Contract clause giving the lender the right to declare the entire loan balance due immediately because of default or other reason stated in the contract.",
            "<strong>Adjustable-Rate Mortgage (ARM)</strong> = A mortgage in which the interest changes periodically, according to corresponding fluctuations in an index. All ARMs are tied to indexes.",
            "<strong>Acceptance</strong> = Agreeing to the terms of an offer,thereby creating a binding contract; taking delivery of a deed.",
            "<strong>Accession</strong> = Gives property owners the right to everything produced by their land. See:Accretion; Annexation; Reliction.",
            "<strong>Accessory Dwelling Units/Apartment</strong> = having a second small dwelling (i.e: apartment over the garage, tiny house on a foundation in the backyard, a basement apartment) right on the same grounds (or attached to) your regular single-family house.",
            "<strong>Accessory Use</strong> = Uses of land (or property) that are found on the same parcel as the principal use but are subordinate and incidental",
            "<strong>Accord and Satisfaction</strong> = An agreement to accept something different (usually less) from what the original contract required.",
            "<strong>Accountability</strong> = n an agency relationship, the agent’s fiduciary duty to account to the principal."
        ],
        terms5: [
            "<strong>Accretion</strong> = The gradual addition of land by the forces of nature.",
            "<strong>Acknowledgment</strong> = The act of signing a document before a notary public, stating it was signed voluntarily.",
            "<strong>Act of Waste</strong> = When a possessor who holds less than fee ownership (i.e., tenant, vendee, and mortgagor) misuses or abuses the property.",
            "<strong>Actionable Fraud</strong> = Fraud meeting certain criteria, so a victim can successfully sue. Victim/plaintiff must prove the defendant concealed material facts or made false statements (intentionally or negligently) with intent to induce the victim to enter a transaction, and that the victim was harmed by relying on these misrepresentations.",
            "<strong>Active Income</strong> = Earnings received from any of the following: wages, salaries, commissions, bonuses, and other payments for services rendered; profit from a trade or business where the taxpayer is an active participant; gain on sale or disposition of assets used in an active trade or business; income from intangible property if the taxpayer played a significant role in creating the property.",
            "<strong>Actual Annexation</strong> = Personal property physically attached to land. See: Fixture.",
            "<strong>Actual Authority</strong> = Authority intentionally given to an agent by the principal, either expressed or implied.",
            "<strong>Actual Cash Value(ACV)</strong> = The cost to replace a property item at the time of loss, less an allowance for depreciation. Often used to determine the amount of reimbursement for a loss (replacement cost minus depreciation).",
            "<strong>Actual Eviction</strong> = Physically forcing someone off property, preventing someone from re-entering property, or using the legal process to make someone leave. Compare: Constructive Eviction.",
            "<strong>Actual Fraud</strong> = Intentional misrepresentation or concealment of a material fact; when a person actively conceals material information or makes statements known to be false or misleading. Also called: Deceit."
        ],
        terms6: [
            "<strong>Actual Notice</strong> = Actual knowledge; that which is known.",
            "<strong>Ad Valorem Tax</strong> = Tax based on the assessed value of property.",
            "<strong>Adequate Consideration</strong> = Consideration comparable in value to that which the other party to the contract is giving.",
            "<strong>Adjustable Rate Mortgage(ARM)</strong> = Mortgage that permits the lender to periodically adjust the interest rate so it reflects fluctuations in the cost of money",
            "<strong>Adjusted Basis</strong> = Original cost of property, plus gains and minus losses.",
            "<strong>Administrative Agency</strong> = Government agency(federal, state, or local) that administers an area of law, adopting and enforcing detailed regulations that have the force of law.",
            "<strong>Administrative Discipline</strong> = Enforcement of license laws through reprimand and denial as well as the suspension and revocation of licenses.",
            "<strong>Administrative Review</strong> = Initiated when a taxpayer files a grievance with his municipal assessing unit; prerequisite to judicial review.",
            "<strong>Administrator</strong> = Person appointed by probate court to manage and distribute a deceased person's estate when no executor is named in the will, or when there is no will.",
            "<strong>Adverse Possession</strong> = Acquiring title to someone else’s real property by possession of it. Possession must be open and notorious, hostile and adverse, exclusive, and continuous for a prescribed number of years (e.g., in New York, 10).",
            "<strong>Affiant</strong> = A person who makes an affidavit.",
            "<strong>Affidavit</strong> = A sworn statement that is written and acknowledged. It may be submitted as evidence in a trial.",
            "<strong>Affirm</strong> = An appeals court ruling that the lower court's decision was correct, rejecting the appellant's arguments."
        ],
        terms7: [
            "<strong>Affirmative Action</strong> = Government policies that collectively sought to redress past discrimination.",
            "<strong>After Tax Cash Flow</strong> = Cash flow from incomeproducing property, less income taxes, if any, attributable to the property’s income. If a tax loss provides a tax savings from the shelter of income earned outside the property, that savings is added to the property’s earned cash flow.",
            "<strong>Age of Majority</strong> = Age at which a person gains legal capacity. (18 in all states except Alabama & Nebraska 19, and Mississippi 21)",
            "<strong>Agency</strong> = Relationship of trust created when one person (principal) gives another person (agent) the right to represent him in dealings with third parties.",
            "<strong>Agency Coupled with an Interest</strong> = Situation in which the agent has a personal interest in the subject of the agency, as when one co-owner has been authorized by the other to sell her property.",
            "<strong>Agency Disclosure Form</strong> = ",
            "<strong>Agency Disclosure Statement</strong> = Form used to disclose the agency relationships permitted, the agency relationships a brokerage practices, payment to/ from brokers who do not represent the broker’s client, and required fair housing language.",
            "<strong>Agency Relationship</strong> = The representation of a party in a real estate transaction.",
            "<strong>Agent</strong> = Person licensed by the state to represent another in a real estate transaction and a member of the National Association of REALTORS®; a person authorized to represent another (principal) in dealings with third parties.",
            "<strong>Air Rights</strong> = The right to undisturbed use and control of airspace over a parcel of land (within reasonable limits for air travel); may be transferred separately from the land.",
            "<strong>Alienation</strong> = Transfer of ownership or an interest in property from one person to another, by any means.",
        ],
        terms8: [
            "<strong>Allodial System</strong> = System of land ownership under which anyone can own land.",
            "<strong>Alluvion</strong> = solid material deposited along a shore by accretion.",
            "<strong>Alteration Agreement</strong> = Written agreement, signed by co-op shareholder-tenants, before any renovations, modifications, repairs, or alterations can begin.",
            "<strong>Alternative Financing</strong> = When real estate is financed with terms and/or concessions other than those typical for conventional loans.",
            "<strong>Amenity Purchaser</strong> = Person who values a property based on its ability to fulfill his specific business needs, unlike investors who value a property based primarily on its investment return.",
            "<strong>Americans with Disabilities Act(ADA)</strong> = Civil rights law that prohibits discrimination based on disability; creates consistent and enforceable standards regarding discrimination based on disability.",
            "<strong>Amortization</strong> = When a loan balance decreases because of periodic installments that pay down both principal and interest.",
            "<strong>Amortized Loans</strong> = When monthly payments retire the debt over the life of the loan instead of leaving the borrower with a large balloon payment at the end of the loan term.",
            "<strong>Amount in Controversy</strong> = Amount of money at issue in a lawsuit; used as a limitation on the jurisdiction of some courts.",
            "<strong>Amperage</strong> = Amount of electricity going through electric wires, measured in amps.",
            "<strong>Anchor Tenant</strong> = Major department or chain store strategically located at shopping centers to give maximum exposure to smaller satellite stores. A center may have several anchor tenants.",
            "<strong>Ancillary Trustee</strong> = A trustee appointed to conclude the business of a broker who has died.",
            "<strong>Annexation</strong> = Attaching personal property to land so the law views it as part of the real property."
        ],
        terms9: [
            "<strong>Annual Percentage Rate(APR)</strong> = Total cost of financing a loan in percentage terms, as a relationship of total finance charges to total amount financed.",
            "<strong>Anticipatory Repudiation</strong> = When one party to a contract informs the other before the time set for performance that he does not intend to perform as agreed.",
            "<strong>Antitrust</strong> = A business activity that attempts to monopolize, contract, or conspire (or any of these things together) in a way that negatively affects another’s ability to do business.",
            "<strong>Apparent Agency</strong> = 1. When someone acts as if she is a person’s agent even though she has not been authorized to do so. 2. When an agent acts beyond the scope of her authority, giving a third party the impression the acts are authorized. Also called: Ostensible Agency or Apparent Authority.",
            "<strong>Appeal</strong> = Process by which a higher court reviews a lower court's decision or an administrative tribunal.",
            "<strong>Appealant</strong> = Party who files an appeal because of dissatisfaction with the trial courts's decision. Also called: Petitioner.",
            "<strong>Appellate Jurisdiction</strong> = authority to hear an appeal as opposed to conducting a trial.",
            "<strong>Appellee</strong> = In an appeal, the party who did NOT file the appeal. Also called: Respondent.",
            "<strong>Appraisal</strong> = A professional analysis used to estimate the value of the property. This includes examples of sales of similar properties. An opinion of the value of property, as of a specified date, supported by objective data.",
            "<strong>Appraisal Report</strong> = The primary means of communicating appraisal results to the client.",
            "<strong>Appraiser</strong> = A professional who conducts 'appraisal'",
            "<strong>Appreciation</strong> = An increase in the market value of a home due to changing market conditions and/or home improvements."
        ],
        terms10: [
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
        ],
        terms11: [
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
            "<strong></strong> = ",
        ],
        notes1: [
            "It is essential that every deed be signed by the grantor.",
            "If you are a salesperson working with a buyer, then the buyer is your client if you have an agency contract with the buyer.",
            "<strong>Proration</strong> = The assignment of costs between the buyer and the seller at the closing."
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