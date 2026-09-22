/**
 * Fictional Sample Legal Documents for Testing, Evaluation, and Demonstration.
 * Clearly labeled as fictional demo documents.
 */

export interface TestCaseDocument {
  id: string;
  name: string;
  title: string;
  category: 'Employment' | 'Offer Letter' | 'NDA' | 'Lease' | 'Contractor' | 'High-Risk Review';
  description: string;
  badge?: string;
  keyProvisionsToInspect: string[];
  text: string;
}

export const DEMO_DOCUMENT_A_NAME = "Apex Technologies Inc. - Employment Agreement (Fictional).txt";

export const DEMO_DOCUMENT_A_TEXT = `EMPLOYMENT AGREEMENT (FICTIONAL DEMO)
NOTICE: THIS IS A FICTIONAL SAMPLE DOCUMENT CREATED SOLELY FOR DEMO AND EVALUATION PURPOSES.

This EMPLOYMENT AGREEMENT (the "Agreement") is entered into as of October 1, 2026, by and between:
EMPLOYER: Apex Technologies Inc., a Delaware corporation having its principal office at 500 Market Street, Suite 1200, San Francisco, CA 94105 ("Company"), and
EMPLOYEE: Alex Morgan, an individual residing at 742 Evergreen Terrace, San Francisco, CA 94110 ("Employee").

1. POSITION AND DUTIES
1.1 Title and Reporting: The Company agrees to employ Employee in the position of Senior Software Engineer, reporting to the VP of Engineering.
1.2 Location: Employee will perform duties primarily from the Company's San Francisco office on a hybrid schedule (minimum of three (3) designated days per week in-office) and remotely on remaining business days.
1.3 Working Hours: This is an exempt full-time position requiring approximately 40 hours per week, with flexibility as reasonably required to meet project deliverables and release milestones.

2. COMMENCEMENT AND PROBATION
2.1 Start Date: Employment shall commence on November 2, 2026 (the "Start Date").
2.2 Probationary Period: The first ninety (90) calendar days of employment shall constitute a probationary period ("Probation Period"). During this Probation Period, either party may terminate this Agreement by providing fourteen (14) calendar days' advance written notice, or payment of base salary in lieu thereof.

3. COMPENSATION AND BENEFITS
3.1 Base Salary: The Company shall pay Employee an annual base salary of $165,000 USD, payable in semi-monthly installments in accordance with the Company's standard payroll practices and subject to applicable tax withholdings.
3.2 Variable Incentive Compensation: Employee shall be eligible to participate in the Company's Discretionary Annual Performance Bonus Plan with a target bonus opportunity of up to 15% of annual base salary. The actual bonus payout is subject to individual performance, company EBITDA targets, and final approval by the Board of Directors. To receive any bonus, Employee must remain actively employed and in good standing on the designated distribution date.
3.3 Health and Welfare Benefits: Employee will be eligible for group health, dental, vision, and 401(k) retirement plans (with up to 4% employer matching after 6 months of service) pursuant to standard plan terms.
3.4 Paid Time Off: Employee shall accrue paid time off ("PTO") at the rate of 1.5 days per month (eighteen (18) days per calendar year), subject to a maximum accrual cap of twenty-four (24) days. Employee is also entitled to ten (10) standard company holidays per year.

4. CONFIDENTIALITY AND PROPRIETARY INFORMATION
4.1 Duty of Confidentiality: During and indefinitely following employment, Employee shall not disclose, copy, publish, or use for personal gain or for any third party any Proprietary Information, customer lists, technical source code, trade secrets, financial models, or non-public business strategies of the Company without prior written authorization.
4.2 Return of Property: Upon termination of employment for any reason, Employee shall immediately return all company-issued laptops, security badges, documents, data files, and any reproductions thereof.

5. INTELLECTUAL PROPERTY ASSIGNMENT
5.1 Assignment of Inventions: Employee agrees to assign and hereby irrevocably assigns to Company all right, title, and interest worldwide in and to all inventions, software code, algorithms, designs, documentation, and improvements ("Inventions") created, conceived, or authored by Employee during employment, whether during business hours or off-hours, if such Inventions relate to the Company's current or demonstrably anticipated business or products, or result from any work performed for the Company.
5.2 Post-Termination Inventions: Any invention conceived by Employee within six (6) months following termination of employment that relates directly to the Company's proprietary systems shall be rebuttably presumed to have been conceived during employment and shall belong to the Company.

6. RESTRICTIVE COVENANTS
6.1 Non-Competition: During employment and for a period of twelve (12) consecutive months following the termination of employment for any reason, Employee covenants and agrees not to directly or indirectly engage in, perform services for, advise, invest in, or operate any business entity that competes directly with the core SaaS analytics products of the Company within a fifty (50) mile radius of San Francisco, California.
6.2 Non-Solicitation of Employees and Clients: For twelve (12) months following termination, Employee shall not directly solicit, recruit, or attempt to induce any current employee or independent contractor of Company to terminate their relationship with the Company, nor solicit active customers of the Company for competing offerings.

7. TERMINATION AND NOTICE
7.1 Termination by Company For Cause: The Company may terminate employment immediately at any time without advance notice or severance pay for "Cause", defined as: (a) material breach of this Agreement; (b) willful misconduct, gross negligence, or fraud; (c) conviction of any felony or crime involving moral turpitude; or (d) continued failure to perform reasonable assigned duties after thirty (30) days' written notice and opportunity to cure.
7.2 Termination Without Cause or Resignation: Following completion of the Probation Period, either party may terminate employment without cause by providing sixty (60) calendar days' prior written notice to the other party. The Company reserves the right, in its sole discretion, to accelerate the departure date by paying base salary in lieu of notice for the remaining balance of the notice period.
7.3 Severance Eligibility: If Company terminates Employee without Cause and contingent upon Employee executing a comprehensive general release of claims in favor of Company, Company shall provide severance pay equal to two (2) months of base salary plus continuation of health benefits under COBRA for two (2) months.

8. GOVERNING LAW AND DISPUTE RESOLUTION
8.1 Governing Law: This Agreement shall be governed by and construed in accordance with the substantive laws of the State of California, without regard to conflict of laws principles.
8.2 Mandatory Arbitration: Any dispute, claim, or controversy arising out of or relating to this Agreement, employment, or termination thereof shall be resolved exclusively through final and binding individual arbitration administered by the American Arbitration Association (AAA) in San Francisco, California. Both parties expressly waive any right to bring or participate in a class, collective, or representative action.

9. ENTIRE AGREEMENT AND AMENDMENTS
9.1 Integration: This Agreement constitutes the complete and exclusive agreement between the parties regarding employment terms and supersedes all prior verbal or written understandings, negotiations, or offer letters.
9.2 Amendments: No modification or amendment of this Agreement shall be valid unless executed in writing and signed by both Employee and an authorized executive officer of the Company.

IN WITNESS WHEREOF, the parties have executed this Employment Agreement as of the date first above written.

APEX TECHNOLOGIES INC.
By: /s/ Elena Vance, Chief Executive Officer
Date: October 1, 2026

EMPLOYEE
By: /s/ Alex Morgan
Date: October 2, 2026
`;

export const DEMO_DOCUMENT_B_NAME = "Beacon Global Systems - Employment Offer Letter B (Fictional).txt";

export const DEMO_DOCUMENT_B_TEXT = `EMPLOYMENT OFFER & AGREEMENT (FICTIONAL DEMO)
NOTICE: THIS IS A FICTIONAL SAMPLE DOCUMENT CREATED SOLELY FOR DEMO AND COMPARISON PURPOSES.

Date: October 15, 2026
To: Alex Morgan
From: Beacon Global Systems LLC, 100 Wall Street, New York, NY 10005

Dear Alex,
Beacon Global Systems LLC ("Beacon" or "Company") is delighted to extend this formal offer of employment for the position of Lead Cloud Architect.

1. POSITION AND WORKING ARRANGEMENT
1.1 Position: Lead Cloud Architect, reporting to the Chief Technology Officer.
1.2 Working Arrangement: Fully remote within the United States, with periodic travel to New York headquarters approximately four (4) times per year for architectural summits.
1.3 Hours: Full-time exempt salaried position, standard 40 hours per week schedule.

2. COMPENSATION AND BONUS
2.1 Base Salary: An annual base salary of $185,000 USD, payable bi-weekly.
2.2 Guaranteed & Performance Bonus: Guaranteed bonus of $18,500 (10% of base salary) for the first year of employment, payable at the end of month 12. In subsequent years, variable bonus of 10% to 20% based on transparent platform reliability and uptime metrics.
2.3 Equity Incentive: Option grant to purchase 15,000 common shares of Beacon Global Systems LLC, vesting over a four-year period with a one-year cliff (25% at month 12, then monthly thereafter).

3. PROBATION AND NOTICE PERIOD
3.1 Probationary Period: Six (6) months (180 calendar days) from commencement date.
3.2 Notice Period: Ninety (90) calendar days' written notice required by either party to terminate employment, whether during or after the probationary period.

4. BENEFITS AND TIME OFF
4.1 Health Care: 100% employer-paid premiums for medical, vision, and dental insurance for employee and eligible dependents.
4.2 401(k) Match: Immediate 100% employer match up to 5% of salary, vested immediately.
4.3 Unlimited Flexible Time Off: Discretionary flexible PTO policy (encouraged minimum 20 days annually) plus 12 national holidays.

5. INTELLECTUAL PROPERTY & MOONLIGHTING
5.1 Inventions Assignment: Employee assigns inventions conceived strictly during working hours or using Company cloud accounts and equipment.
5.2 Carve-out: Explicit exclusion for personal side-projects and pre-existing open-source contributions, provided they are developed outside work hours, without company equipment, and do not relate to multi-cloud container orchestration software.

6. RESTRICTIVE COVENANTS
6.1 Non-Compete: Restricted for six (6) months post-employment, strictly limited to direct commercial multi-cloud orchestration competitors.
6.2 Non-Solicitation: Nine (9) months non-solicitation of direct engineering team members.

7. TERMINATION AND SEVERANCE
7.1 Severance: In the event of termination without cause, Company provides three (3) months' base salary severance plus three (3) months COBRA coverage upon execution of standard mutual release.
7.2 For Cause: Immediate termination without severance for gross negligence, willful misconduct, or unauthorized breach of customer data.

8. GOVERNING LAW AND JURISDICTION
8.1 Governing Law: State of New York.
8.2 Jurisdiction: State or federal courts situated in New York County, New York. Mutual waiver of jury trial.

Sincerely,
BEACON GLOBAL SYSTEMS LLC
By: /s/ Marcus Sterling, CTO

Agreed & Accepted:
By: /s/ Alex Morgan
Date: October 18, 2026
`;

export const DEMO_DOCUMENT_C_NAME = "Horizon Robotics & Quantum Labs - Mutual NDA (Fictional).txt";

export const DEMO_DOCUMENT_C_TEXT = `MUTUAL NON-DISCLOSURE AGREEMENT (FICTIONAL DEMO)
NOTICE: THIS IS A FICTIONAL SAMPLE DOCUMENT CREATED SOLELY FOR DEMO AND EVALUATION PURPOSES.

This Mutual Non-Disclosure Agreement ("Agreement") is made and entered into as of November 10, 2026 ("Effective Date"), by and between:
PARTY A: Horizon Robotics Inc., a California corporation with offices at 1400 Innovation Way, San Jose, CA 95134 ("Horizon"), and
PARTY B: Quantum Labs AI LLC, a Washington limited liability company with offices at 2200 Pine Street, Seattle, WA 98101 ("Quantum").
Each party may disclose ("Disclosing Party") or receive ("Receiving Party") confidential information.

1. PURPOSE OF DISCLOSURE
The parties wish to explore a potential strategic business collaboration regarding autonomous navigation neural models and edge sensor integration (the "Permitted Purpose").

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any proprietary, technical, commercial, financial, or product roadmap information disclosed by Disclosing Party to Receiving Party, whether in writing, orally, electronically, or visually, that is marked as "Confidential", "Proprietary", or that by its nature reasonably ought to be understood as confidential. Confidential Information includes source code, neural network weights, sensor schematics, customer lists, pricing data, and benchmark results.

3. EXCLUSIONS FROM CONFIDENTIAL INFORMATION
Confidential Information shall not include information that:
(a) is or becomes publicly available without breach of this Agreement by Receiving Party;
(b) was already rightfully known to Receiving Party without confidentiality restriction prior to disclosure;
(c) is independently developed by Receiving Party without reference to or use of Disclosing Party's Confidential Information; or
(d) is rightfully received from a third party who has no duty of confidentiality to Disclosing Party.

4. OBLIGATIONS OF RECEIVING PARTY
4.1 Standard of Care: Receiving Party agrees to protect Confidential Information using at least the same degree of care it uses for its own confidential information of like sensitivity, but in no event less than a reasonable degree of care.
4.2 Limited Access: Receiving Party shall restrict access strictly to its employees, contractors, and legal/financial advisors who have a need to know for the Permitted Purpose and who are bound by confidentiality obligations at least as restrictive as this Agreement.
4.3 No Reverse Engineering: Receiving Party shall not decompile, disassemble, or reverse-engineer any software, prototypes, or hardware delivered hereunder.

5. COMPELLED DISCLOSURE
If Receiving Party is legally required by court order, subpoena, or regulatory agency to disclose Confidential Information, it shall provide prompt written notice to Disclosing Party (where legally permissible) to allow Disclosing Party to seek a protective order, and shall disclose only that portion legally mandated.

6. TERM AND TERMINATION
6.1 Term of Agreement: This Agreement shall govern disclosures made within one (1) year from the Effective Date.
6.2 Duration of Confidentiality: The obligations of confidentiality and non-use shall survive termination and remain in effect for three (3) years from the date of disclosure; provided that for trade secrets and core proprietary source code, obligations shall continue indefinitely until such information loses trade secret status through no fault of Receiving Party.
6.3 Return or Destruction: Within thirty (30) calendar days of written request by Disclosing Party, Receiving Party shall securely destroy or return all copies of Confidential Information and certify compliance in writing.

7. NO LICENSE OR WARRANTY
Nothing herein grants any patent, copyright, trademark, or commercial license. All information is provided "AS IS" without warranties of accuracy, completeness, or non-infringement.

8. REMEDIES AND EQUITABLE RELIEF
The parties acknowledge that unauthorized disclosure may cause irreparable harm for which monetary damages would be inadequate. Disclosing Party shall be entitled to seek injunctive relief and specific performance in addition to all other legal remedies.

9. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California, without regard to conflicts of law rules. Exclusive jurisdiction shall lie in Santa Clara County, California.

IN WITNESS WHEREOF, the parties have executed this Agreement.

HORIZON ROBOTICS INC.
By: /s/ Dr. Kenji Sato, Chief Technology Officer
Date: November 10, 2026

QUANTUM LABS AI LLC
By: /s/ Sarah Jenkins, VP of Partnerships
Date: November 11, 2026
`;

export const DEMO_DOCUMENT_D_NAME = "Oakridge Apartments - Residential Lease Agreement (Fictional).txt";

export const DEMO_DOCUMENT_D_TEXT = `RESIDENTIAL LEASE AGREEMENT (FICTIONAL DEMO)
NOTICE: THIS IS A FICTIONAL SAMPLE DOCUMENT CREATED SOLELY FOR DEMO AND EVALUATION PURPOSES.

THIS RESIDENTIAL LEASE AGREEMENT (the "Lease") is made on this 1st day of December, 2026, by and between:
LANDLORD: Oakridge Residential Properties LLC, 450 Elmwood Drive, Austin, TX 78701 ("Landlord"), and
TENANT: Jordan Taylor ("Tenant").

1. PREMISES
Landlord leases to Tenant the residential apartment located at: Unit 402, Oakridge Residences, 880 Barton Creek Blvd, Austin, TX 78704 (the "Premises"), solely for residential occupancy by Tenant and immediate occupants.

2. TERM AND RENEWAL
2.1 Lease Term: The initial term shall be twelve (12) months, commencing on January 1, 2027 and terminating at 11:59 PM on December 31, 2027 ("Initial Term").
2.2 Non-Renewal Notice: Either party may elect not to renew by providing at least sixty (60) calendar days' advance written notice prior to the expiration of the Initial Term.
2.3 Automatic Month-to-Month Conversion: If neither party provides 60 days' written notice, this Lease shall automatically convert into a month-to-month tenancy upon expiration, subject to a monthly rent increase of 10% over the then-prevailing rate.

3. RENT AND PAYMENT TERMS
3.1 Monthly Rent: Tenant agrees to pay monthly rent in the amount of $2,450.00 USD, due strictly on the first (1st) day of each calendar month.
3.2 Grace Period and Late Fees: If rent is not received by 11:59 PM on the fourth (4th) day of the month, a late fee of $125.00 shall be assessed, plus an additional $10.00 per day until full payment is received.
3.3 Utilities: Tenant is responsible for electricity, internet, and cable. Water, sewer, and municipal trash collection are billed back at a flat fee of $65.00/month.

4. SECURITY DEPOSIT
4.1 Deposit Amount: Upon execution of this Lease, Tenant shall deposit $2,450.00 USD as a security deposit against property damage beyond normal wear and tear.
4.2 Return of Deposit: Landlord shall return the security deposit, less any documented deductions with an itemized accounting, within thirty (30) calendar days following vacating of the Premises and return of keys.

5. PET POLICY AND RESTRICTIONS
5.1 Pet Approval: One (1) domestic cat or dog under 35 lbs is permitted, subject to Landlord's prior written consent, payment of a non-refundable $350.00 pet registration fee, and monthly pet rent of $45.00.
5.2 Nuisance: Pets creating excessive noise or disturbances must be removed within seven (7) days of written notice.

6. MAINTENANCE AND QUIET ENJOYMENT
6.1 Maintenance: Tenant shall keep the Premises in clean, sanitary condition. Tenant is responsible for minor maintenance under $75 (such as replacing light bulbs and smoke detector batteries). Landlord handles major plumbing, electrical, and HVAC repairs.
6.2 Quiet Hours: Quiet hours are strictly observed between 10:00 PM and 7:00 AM daily.
6.3 Alterations: Tenant shall not paint, drill into tiles, or structurally alter the Premises without Landlord's prior written permission.

7. LANDLORD ACCESS
Landlord or its agents may enter the Premises upon twenty-four (24) hours' advance notice to perform necessary repairs, safety inspections, or show the property to prospective buyers or tenants. In an emergency (e.g. fire, active water pipe burst), Landlord may enter immediately without prior notice.

8. EARLY TERMINATION
Tenant may terminate this Lease early only upon providing sixty (60) days' written notice, paying rent through the notice period, and paying an Early Termination Fee equal to two (2) months' rent ($4,900.00).

9. GOVERNING LAW
This Lease shall be governed by the laws of the State of Texas. Any legal proceeding shall occur in Travis County, Texas.

IN WITNESS WHEREOF, the parties sign this Lease:
LANDLORD: Oakridge Residential Properties LLC
By: /s/ Danielle Brooks, Property Director
Date: December 1, 2026

TENANT:
By: /s/ Jordan Taylor
Date: December 1, 2026
`;

export const DEMO_DOCUMENT_E_NAME = "PixelCraft Design - Independent Contractor Agreement (Fictional).txt";

export const DEMO_DOCUMENT_E_TEXT = `INDEPENDENT CONTRACTOR MASTER SERVICES AGREEMENT (FICTIONAL DEMO)
NOTICE: THIS IS A FICTIONAL SAMPLE DOCUMENT CREATED SOLELY FOR DEMO AND EVALUATION PURPOSES.

This Independent Contractor Agreement ("Agreement") is dated January 15, 2027, between:
CLIENT: Apex Media Group Inc., a Delaware corporation located at 350 Hudson Street, New York, NY 10014 ("Client"), and
CONTRACTOR: PixelCraft Studio LLC, a Colorado LLC owned by Maya Lin ("Contractor").

1. SCOPE OF SERVICES
Contractor shall provide brand identity, UI/UX design systems, and responsive web component specifications for Client's next-generation customer portal as described in Statement of Work #1 ("SOW").

2. INDEPENDENT CONTRACTOR RELATIONSHIP
2.1 Status: Contractor is an independent contractor, not an employee, agent, or partner of Client. Contractor retains full control over the manner, location, and methods of executing services.
2.2 Taxes and Benefits: Client shall not withhold any payroll taxes, FICA, or income tax. Contractor is exclusively responsible for paying all federal, state, and self-employment taxes. Contractor is not entitled to participate in Client's health, pension, vacation, or other employee benefit programs.

3. COMPENSATION AND PAYMENT SCHEDULE
3.1 Fixed Project Fee: Client agrees to pay Contractor a total fixed project fee of $24,000.00 USD, payable according to milestones:
    - Milestone 1 (Design Research & Moodboards): $6,000.00 upon execution.
    - Milestone 2 (Wireframes & UI Kit): $10,000.00 upon approval of prototype.
    - Milestone 3 (Final Design Handoff & Design Tokens): $8,000.00 upon final asset delivery.
3.2 Invoicing and Payment Terms: Invoices are payable Net-30 days from date of receipt. Late invoices incur interest of 1.5% per month or the statutory legal maximum.
3.3 Out-of-Pocket Expenses: Pre-approved business expenses (e.g. stock asset licenses, specialized fonts) exceeding $100 shall be reimbursed by Client upon receipt.

4. INTELLECTUAL PROPERTY & OWNERSHIP
4.1 Transfer Upon Full Payment: Conditioned upon Contractor receiving full and final payment of all fees due hereunder, Contractor assigns to Client all right, title, and interest worldwide in the final deliverables created specifically for Client under this Agreement.
4.2 Contractor Retained Pre-Existing Tools: Contractor retains exclusive ownership of all pre-existing design frameworks, proprietary scripts, reusable icon sets, brushes, and design methodologies ("Background IP"). Contractor grants Client a perpetual, royalty-free license to use Background IP solely as incorporated into the final deliverable.

5. CONFIDENTIALITY
Each party shall safeguard the other party's confidential business and technical information for two (2) years following the conclusion of services.

6. TERM AND TERMINATION
6.1 Termination for Convenience: Either party may terminate this Agreement without cause upon fourteen (14) calendar days' advance written notice.
6.2 Payment upon Termination: In the event of early termination, Client shall immediately pay Contractor for all milestones completed and billable hours expended through the date of termination.

7. INDEMNIFICATION AND LIMITATION OF LIABILITY
7.1 Mutual Indemnification: Contractor warrants that deliverables are original and do not infringe third-party intellectual property. Client indemnifies Contractor against claims arising from materials or content supplied by Client.
7.2 Cap on Liability: In no event shall either party's aggregate liability under this Agreement exceed the total fees paid or payable by Client in the preceding six (6) months.

8. GOVERNING LAW
Governed by the laws of the State of Colorado. Venue shall lie exclusively in Denver County, Colorado.

APEX MEDIA GROUP INC.
By: /s/ Thomas Sterling, VP Creative
Date: January 15, 2027

PIXELCRAFT STUDIO LLC
By: /s/ Maya Lin, Principal Designer
Date: January 15, 2027
`;

export const DEMO_DOCUMENT_F_NAME = "High-Risk Employment Agreement (Atypical Review Sample).txt";

export const DEMO_DOCUMENT_F_TEXT = `EXECUTIVE EMPLOYMENT AGREEMENT (HIGH-RISK / ATYPICAL TEST CASE)
NOTICE: THIS IS A FICTIONAL EVALUATION SAMPLE ENGINEERED SPECIFICALLY TO TEST HIGHLIGHTING OF ATYPICAL AND HIGH-FRICTION LEGAL PROVISIONS.

This AGREEMENT is entered into on February 1, 2027, by Titan Global Dynamics Ltd. ("Company") and Employee ("Individual").

1. EMPLOYMENT TERM AND DUTIES
1.1 Position: Senior Director of Product Operations.
1.2 Working Hours: Minimum fifty-five (55) hours weekly, including mandatory weekend on-call duty without additional overtime compensation.
1.3 Unilateral Role Reassignment: The Company retains the unilateral right to alter Employee's job title, reporting manager, compensation structure, and physical relocation anywhere within North America upon thirty (30) days' notice.

2. COMPENSATION AND CLAWBACK PROVISIONS
2.1 Base Salary: $170,000 USD per annum, paid monthly.
2.2 Discretionary Bonus Clawback: If Employee resigns within twenty-four (24) months after receiving any performance bonus or retention stipend, Employee shall immediately repay 100% of all gross bonus amounts received during that 24-month period. Company may deduct such amounts from final salary or accrued vacation.

3. NOTICE PERIOD AND FORFEITURE
3.1 Excessive Notice Period: Employee must provide one hundred eighty (180) calendar days (6 months) prior written notice of resignation. During this 180-day period, Company may place Employee on unpaid garden leave while prohibiting Employee from seeking alternative employment.
3.2 Resignation Penalty: If Employee provides less than 180 days' notice, Employee forfeits all earned but unpaid compensation, commissions, and accrued PTO as liquidated damages.

4. COMPREHENSIVE INTELLECTUAL PROPERTY ASSIGNMENT
4.1 Perpetual Worldwide IP Seizure: Employee assigns to Company all inventions, ideas, writings, software, and concepts conceived or authored during employment or within twenty-four (24) months post-employment, regardless of whether created during working hours, using personal computers, or completely unrelated to Company's business.

5. RESTRICTIVE COVENANTS
5.1 Worldwide Non-Compete: For twenty-four (24) months following termination for any reason, Employee shall not directly or indirectly work for, consult with, advise, or invest in any enterprise operating in the software, enterprise technology, internet, or communications industries anywhere in the world.
5.2 Non-Solicitation: Thirty-six (36) months restriction against hiring or contacting any current or former employee, contractor, or vendor of Company.
5.3 Non-Disparagement: Perpetual unilateral covenant prohibiting Employee from ever making any negative, critical, or questioning remarks regarding Company, its executives, or workplace culture.

6. UNILATERAL INDEMNIFICATION AND LEGAL FEES
6.1 Employee Liability: Employee shall defend, indemnify, and hold harmless Company from any dispute, customer grievance, or regulatory investigation arising in connection with Employee's operational division.
6.2 Fee Shifting: In any dispute between Company and Employee, Employee shall advance and reimburse all of Company's attorneys' fees, expert fees, and arbitration costs regardless of the outcome.

7. ARBITRATION AND VENUE
Mandatory binding arbitration in the Cayman Islands under Cayman procedural rules. Employee waives all rights to jury trial, statutory administrative wage claims, and collective dispute resolution.

IN WITNESS WHEREOF:
TITAN GLOBAL DYNAMICS LTD.
By: /s/ Executive Committee
Date: February 1, 2027

EMPLOYEE:
Date: February 1, 2027
`;

export const ALL_TEST_CASE_DOCUMENTS: TestCaseDocument[] = [
  {
    id: 'demoA',
    name: DEMO_DOCUMENT_A_NAME,
    title: 'Apex Technologies Employment Agreement',
    category: 'Employment',
    badge: 'Standard Tech Agreement',
    description:
      'Standard California tech employment agreement with 60-day notice, 90-day probation, hybrid schedule, and 12-month non-compete.',
    keyProvisionsToInspect: [
      '60-day resignation notice period (Section 7.2)',
      '12-month post-employment non-compete (Section 6.1)',
      'Post-employment IP assignment up to 6 months (Section 5.2)',
      'Discretionary annual bonus conditions (Section 3.2)',
      'Mandatory AAA arbitration in San Francisco (Section 8.2)',
    ],
    text: DEMO_DOCUMENT_A_TEXT,
  },
  {
    id: 'demoB',
    name: DEMO_DOCUMENT_B_NAME,
    title: 'Beacon Global Systems Offer Letter',
    category: 'Offer Letter',
    badge: 'Remote Offer Letter',
    description:
      'Remote cloud architect offer with guaranteed first-year bonus, equity grant, 90-day notice, and narrower IP carve-out.',
    keyProvisionsToInspect: [
      '$18,500 guaranteed 1st-year bonus (Section 2.2)',
      '15,000 equity stock options with 1-year cliff (Section 2.3)',
      '90-day mutual notice requirement (Section 3.2)',
      'Clear moonlighting & open-source carve-out (Section 5.2)',
      '6-month non-compete limited to direct competitors (Section 6.1)',
    ],
    text: DEMO_DOCUMENT_B_TEXT,
  },
  {
    id: 'demoC',
    name: DEMO_DOCUMENT_C_NAME,
    title: 'Horizon Robotics & Quantum Labs Mutual NDA',
    category: 'NDA',
    badge: 'B2B Confidentiality',
    description:
      'Standard mutual non-disclosure agreement for AI collaboration with standard exclusions, 3-year survival, and trade secret rules.',
    keyProvisionsToInspect: [
      'Scope of Confidential Information & trade secrets (Section 2)',
      'Standard exclusions from confidentiality (Section 3)',
      '3-year confidentiality survival period (Section 6.2)',
      'Compelled disclosure notification requirements (Section 5)',
      'Equitable relief & injunction remedies (Section 8)',
    ],
    text: DEMO_DOCUMENT_C_TEXT,
  },
  {
    id: 'demoD',
    name: DEMO_DOCUMENT_D_NAME,
    title: 'Oakridge Residences Lease Agreement',
    category: 'Lease',
    badge: 'Residential Lease',
    description:
      '12-month residential apartment lease with $2,450/mo rent, security deposit terms, pet policy, quiet hours, and 60-day notice.',
    keyProvisionsToInspect: [
      '$2,450 security deposit return conditions (Section 4)',
      '60-day notice requirement for non-renewal (Section 2.2)',
      'Automatic month-to-month conversion with 10% rent hike (Section 2.3)',
      'Early termination fee equal to 2 months rent (Section 8)',
      '24-hour advance entry notice by landlord (Section 7)',
    ],
    text: DEMO_DOCUMENT_D_TEXT,
  },
  {
    id: 'demoE',
    name: DEMO_DOCUMENT_E_NAME,
    title: 'PixelCraft Independent Contractor Agreement',
    category: 'Contractor',
    badge: 'Freelance & 1099',
    description:
      'Design master services agreement with milestone compensation, Net-30 payment, IP assignment upon full payment, and background IP retention.',
    keyProvisionsToInspect: [
      'Independent contractor tax obligations & lack of benefits (Section 2)',
      '$24,000 milestone-based payment schedule (Section 3.1)',
      'IP transfer conditioned on receipt of full payment (Section 4.1)',
      'Contractor retains background IP & tools (Section 4.2)',
      '14-day termination for convenience with payment for work done (Section 6)',
    ],
    text: DEMO_DOCUMENT_E_TEXT,
  },
  {
    id: 'demoF',
    name: DEMO_DOCUMENT_F_NAME,
    title: 'Titan Global Atypical Agreement ("Red Flag" Sample)',
    category: 'High-Risk Review',
    badge: 'Attention Areas Stress-Test',
    description:
      'Engineered sample containing extreme terms: 180-day notice, 24-month worldwide non-compete, bonus clawbacks, and employee indemnification.',
    keyProvisionsToInspect: [
      '180-day (6-month) resignation notice with unpaid garden leave (Section 3.1)',
      '24-month bonus clawback upon resignation (Section 2.2)',
      '24-month worldwide blanket non-compete (Section 5.1)',
      'Broad 24-month post-employment personal IP seizure (Section 4.1)',
      'Employee pays all company legal fees & Cayman Islands venue (Section 6 & 7)',
    ],
    text: DEMO_DOCUMENT_F_TEXT,
  },
];
