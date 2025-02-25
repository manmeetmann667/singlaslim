import { Component, OnInit } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { AngularFirestore } from "@angular/fire/firestore"

@Component({
	selector: "app-book-appointment",
	templateUrl: "./book-appointment.component.html",
	styleUrls: ["./book-appointment.component.css"],
})
export class BookAppointmentComponent implements OnInit {
	private url = "https://restcountries.com/v3.1/all"
	countries: any[] = []
	selectedCountry: any = {
		name: "United States",
		code: "+1",
		flag: "https://flagcdn.com/w40/us.png",
	}
	phoneNumber: string = ""
	isDropdownVisible = false
	name: string = "" // User Name
	email: string = "" // User Email

	constructor(
		private http: HttpClient,
		private firestore: AngularFirestore // Inject Firestore service
	) {}

	ngOnInit(): void {
		this.getCountries().subscribe((data) => {
			this.countries = data
				.map((country) => ({
					name: country.name.common,
					code:
						country.idd?.root +
						(country.idd?.suffixes ? country.idd.suffixes[0] : ""),
					flag: country.flags?.png || "",
				}))
				.filter((c) => c.code) // Filter out countries without a dialing code
				.sort((a, b) => a.name.localeCompare(b.name)) // Sort countries alphabetically
		})
	}

	onCountrySelect(event: any) {
		const countryCode = event.target.value
		const selected = this.countries.find(
			(c) => c.code === countryCode
		)
		if (selected) {
			this.selectedCountry = selected
			this.isDropdownVisible = false // Close the dropdown after selection
		}
	}

	getCountries(): Observable<any[]> {
		return this.http.get<any[]>(this.url)
	}

	toggleDropdown() {
		this.isDropdownVisible = !this.isDropdownVisible
	}

	// Function to handle form submission
	onSubmit() {
		const bookingDetails = {
			name: this.name,
			phone: this.phoneNumber,
			email: this.email,
			country: this.selectedCountry.name, // Country selected by the user
			phoneCode: this.selectedCountry.code,
		}

		// Add booking details to Firebase Firestore collection
		this.firestore
			.collection("bookingdetails")
			.add(bookingDetails)
			.then(() => {
				console.log("Booking details added successfully!")
				// Reset form fields after successful submission
				this.name = ""
				this.phoneNumber = ""
				this.email = ""
			})
			.catch((error) => {
				console.error("Error adding document: ", error)
			})
	}
}
