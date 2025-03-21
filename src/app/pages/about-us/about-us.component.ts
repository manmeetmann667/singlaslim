import { Component, OnInit } from "@angular/core"
import {
	DomSanitizer,
	SafeResourceUrl,
} from "@angular/platform-browser"

@Component({
	selector: "app-about-us",
	templateUrl: "./about-us.component.html",
	styleUrls: ["./about-us.component.css"],
})
export class AboutUsComponent implements OnInit {
	iframeSrc: SafeResourceUrl // Use SafeResourceUrl for sanitized iframe URLs
	searchCity: string = ""
	showCityList: boolean = false
	cities: string[] = []

	// City mapping with corresponding Google Maps embed URLs
	cityMap: { [key: string]: string } = {
		LUDHIANA:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d872590.5328929112!2d74.36157277812501!3d31.31599340000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a83ceecb71813%3A0x4d88a1265ec53df8!2sSingla%20Slimming%20Clinic%3A%20Weight%20Loss%20Clinic!5e0!3m2!1sen!2sca!4v1739867189642!5m2!1sen!2sca",
		JALANDHAR:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.5508095679825!2d75.5785082753004!3d31.31615805720361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5bfe544e6bcb%3A0x9d0fc0e206360b23!2sMKC%20Mall!5e0!3m2!1sen!2sin!4v1739870638698!5m2!1sen!2sin",
		ZIRAKPUR:
			"https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3432.8583882507537!2d76.81409578147195!3d30.63794832481166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM4JzE2LjYiTiA3NsKwNDknMDguMyJF!5e0!3m2!1sen!2sin!4v1739867835870!5m2!1sen!2sin",
		MOHALI:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109748.5657591985!2d76.4362851736922!3d30.728444147448787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffcc02abd41%3A0xed52846db25d8da4!2sPlaza%20117!5e0!3m2!1sen!2sin!4v1739867926515!5m2!1sen!2sin",
		AMRITSAR:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.9946491958167!2d74.85414877531358!3d31.661366140163043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919648dc220ec3f%3A0x334711e8a643a67d!2sD-Block%20Rd%2C%20Gumtala%20Sub%20Urban%2C%20Ranjit%20Avenue%2C%20Amritsar%2C%20Punjab!5e0!3m2!1sen!2sin!4v1739954972100!5m2!1sen!2sin",
	}

	constructor(private sanitizer: DomSanitizer) {}

	ngOnInit(): void {
		this.cities = Object.keys(this.cityMap)
		// Set default location to LUDHIANA
		this.iframeSrc = this.sanitizeUrl(this.cityMap["LUDHIANA"])
	}

	// Toggle dropdown visibility
	toggleCityList(): void {
		this.showCityList = !this.showCityList
	}

	// Function to select a city from the dropdown
	selectCity(city: string): void {
		this.searchCity = city
		this.updateMap(city)
		this.showCityList = false
	}

	// Function to update the map based on the city input
	onSearch(): void {
		let city = this.searchCity.toUpperCase().trim()
		if (this.cityMap[city]) {
			this.updateMap(city)
		} else {
			alert("City not found! Please enter a valid city name.")
		}
	}

	// Function to update iframe when clicking a predefined city
	changeLocation(city: string): void {
		this.searchCity = city
		this.updateMap(city)
	}

	// Helper function to update iframeSrc
	private updateMap(city: string): void {
		this.iframeSrc = this.sanitizeUrl(this.cityMap[city])
	}

	// Helper function to sanitize URL
	private sanitizeUrl(url: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url)
	}
}
