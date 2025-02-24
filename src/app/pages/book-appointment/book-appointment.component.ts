import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"

@Component({
	selector: "app-book-appointment",
	templateUrl: "./book-appointment.component.html",
	styleUrls: ["./book-appointment.component.css"],
})
export class BookAppointmentComponent implements OnInit {
	countries: any[] = []
	selectedCountry: any = {
		name: "United States",
		code: "+1",
		flag: "https://flagcdn.com/w320/us.png",
	}
	phoneNumber: string = ""
	isDropdownVisible = false

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.getCountries().subscribe((data) => {
			this.countries = data
				.map((country: any) => ({
					name: country.name.common,
					code:
						country.idd?.root +
						(country.idd?.suffixes ? country.idd.suffixes[0] : ""),
					flag: country.flags?.png || "",
				}))
				.sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
		})
	}

	onCountrySelect(countryCode: string): void {
		// Find the selected country based on the country code
		const selected = this.countries.find(
			(c) => c.code === countryCode
		)
		if (selected) {
			this.selectedCountry = selected
			this.isDropdownVisible = false // Hide dropdown after selection
		}
	}

	getCountries(): Observable<any[]> {
		// Using Restcountries API
		return this.http.get<any[]>("https://restcountries.com/v3.1/all")
	}

	toggleDropdown(): void {
		this.isDropdownVisible = !this.isDropdownVisible
	}
}
