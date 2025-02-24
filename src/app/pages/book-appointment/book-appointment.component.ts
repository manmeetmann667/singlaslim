import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"

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

	constructor(private http: HttpClient) {}

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
}
