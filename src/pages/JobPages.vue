<template>
  <div class="container">
    <div class="text-center my-5">
      <h1>All Job Posting</h1>
      <p>Any Information About Job Title from Github Job API</p>
      <p>Built with <strong>Hafidh</strong></p>
    </div>
    <div class="my-5">
      <form>
        <div class="row">
          <div class="col-12 col-md-4 mb-2">
            <label for="description"><b>Job Description</b></label>
            <input
              type="text"
              class="form-control"
              placeholder="Filter by expertise, title, companies and benefits"
              id="description"
              v-model="description"
            />
          </div>
          <div class="col-12 col-md-4 mb-2">
            <label for="location"><b>Location</b></label>
            <input
              type="text"
              class="form-control"
              placeholder="Filter with city, post code, and location"
              id="location"
              v-model="location"
            />
          </div>
          <div class="col d-flex align-items-end">
            <label for="fulltime"
              ><input
                type="checkbox"
                v-model="isFulltime"
                class="mr-2"
                id="fulltime"
              /><b>Is Fulltime Only</b></label
            >
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <button
              @click="searchJobMatched"
              type="button"
              class="btn btn-info px-3 ml-auto mr-3"
            >
              Search Job
            </button>
            <button
              @click="clearInput"
              type="button"
              class="btn btn-warning px-3 ml-auto text-white"
            >
              Clear Input
            </button>
          </div>
        </div>
      </form>
    </div>
    <div
      class="d-flex justify-content-center align-items-center py-3 w-full"
      v-if="isLoading"
    >
      <font-awesome-icon
        class="text-secondary"
        icon="compass"
        spin
        size="6x"
        swap-opacity
      />
    </div>
    <div class="table-responsive" v-else>
      <table class="table table-stripe">
        <thead>
          <tr>
            <th @click="sortJobs('title')">
              Job Title
              <font-awesome-icon class="pt-1" :icon="iconSort('title')" />
            </th>
            <th @click="sortJobs('location')">
              Location
              <font-awesome-icon class="pt-1" :icon="iconSort('location')" />
            </th>
            <th @click="sortJobs('company')">
              Company
              <font-awesome-icon class="pt-1" :icon="iconSort('company')" />
            </th>
            <th @click="sortJobs('type')">
              Type <font-awesome-icon class="pt-1" :icon="iconSort('type')" />
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="jobs.length > 0">
            <tr v-for="(job, index) in sortedJobs" :key="index">
              <td>
                <!-- <img :src="job.company_logo" alt="Company Logo" style="width:50px"> -->
                <router-link
                  :to="{ name: 'Detail', params: { id: job.id } }"
                  class="text-secondary"
                  ><strong>{{ job.title }}</strong></router-link
                >
              </td>
              <td>{{ job.location }}</td>
              <td>{{ job.company }}</td>
              <td>{{ job.type }}</td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="4" class="text-center">Data response is empty</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center align-item-center p-4 mb-5">
      <ul class="pagination">
        <li
          @click="previousPage"
          class="page-item"
          :class="{ disabled: disable.prev }"
        >
          <a class="page-link" tabindex="-1">Previous</a>
        </li>
        <li
          @click="nextPage"
          class="page-item"
          :class="{ disabled: disable.next }"
        >
          <a class="page-link">Next</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobPages",
  data() {
    return {
      jobs: [],
      location: "",
      isFulltime: false,
      description: "",
      currentPage: 1,
      disable: {
        next: false,
        prev: true,
      },
      isLoading: false,
      sort: {
        order: "asc",
        column: "title",
      },
    }
  },
  mounted() {
    this.fetchAllJobs()
  },
  computed: {
    sortedJobs() {
      return this.jobs.slice().sort((a, b) => {
        let left = a[this.sort.column].toLowerCase().trim()
        let right = b[this.sort.column].toLowerCase().trim()

        if (left > right) {
          return this.sort.order == "asc" ? -1 : 1
        } else if (left < right) {
          return this.sort.order == "desc" ? -1 : 1
        } else {
          return 0
        }
      })
    },
  },
  methods: {
    async fetchAllJobs() {
      let query = ""
      if (this.description !== "") {
        query += `description=${this.description}`
      }

      if (this.location !== "") {
        query += `location=${this.location}`
      }

      if (this.isFulltime !== false) {
        query += `full_time=${this.isFulltime}`
      }

      // using pagination
      if (this.currentPage != 1) {
        query += `page=${this.currentPage}`
      }

      if (query != "") {
        query = `?${query}`
      }
      try {
        this.isLoading = true

        let jobsData = await this.$http.get(
          `jobs.github.com/positions.json${query}`
        )
        let data = await jobsData
        this.jobs = data.data
        query = ""
      } catch (error) {
        console.log(error.response.data)
      }
      this.isLoading = false
    },
    sortJobs(column) {
      // this.iconSort = ['fas', 'sort-up']
      this.sort.column = column
      if (this.sort.order == "asc") {
        this.sort.order = "desc"
      } else {
        this.sort.order = "asc"
      }
    },
    iconSort(column) {
      if (this.sort.column == column) {
        if (this.sort.order == "asc") {
          return ["fas", "sort-down"]
        } else {
          return ["fas", "sort-up"]
        }
      } else {
        return ["fas", "sort"]
      }
    },
    searchJobMatched() {
      this.fetchAllJobs()
    },
    clearInput() {
      this.location = ""
      this.isFulltime = false
      this.description = ""
      this.fetchAllJobs()
    },
    nextPage() {
      this.disable.prev = false

      if (this.jobs.length == 0) {
        this.disable.next = true
        return
      }

      this.currentPage++

      this.fetchAllJobs()
    },
    previousPage() {
      this.disable.next = false

      if (this.currentPage <= 0) {
        this.disable.prev = true
        return
      }

      this.currentPage--
      this.fetchAllJobs()
    },
  },
}
</script>

<style></style>
