export default {
  methods: {
    updateEndDate (date) {
      this.filters.endDate = date
    },
    updateStartDate (date) {
      this.filters.startDate = date
    },
    getAddressData (data) {
      this.filters.location = `${data.locality}, ${data.administrative_area_level_1}, ${data.country}`
    }
  }
}
