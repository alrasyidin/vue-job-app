<template>
  <div class="container my-4">
    <div class="card">
      <div class="card-body">
				<div class="card-title d-flex justify-content-between align-items-start">
					<div>
						<h2 class="mw-100">{{ job.title }}</h2>
						<h5>
							<span class="">{{ job.location }}</span>
						</h5>
						<div class="my-1">
							<span class="">{{ job.type }}</span> Position in
							<a v-if="job.company_url != null" class="text-info font-weight-bold" target="_blank" :href="job.company_url">{{ job.company }}</a>
							<div v-else class="text-info font-weight-bold">{{job.company}}</div>
						</div>
						<div v-html="job.how_to_apply"></div>
					</div>
					<button class="btn btn-outline btn-info" @click="goBack"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path style="fill:white" d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm-1-17v4h8v2h-8v4l-6-5 6-5z"/></svg> Go Back</button>
				</div>
				
				<hr>
				<div class="content">
					<div v-html="job.description"></div>
					
				</div>
      </div>
			<div class="card-footer">
					<time class="text-dark"><time>{{createdAt}}</time></time>
			</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "JobDetailPages",
  props: ["id"],
  data() {
    return {
      job: {},
    }
  },
  mounted() {
    this.fetchJobDetail(this.id)
  },
  computed: {
		createdAt(){
			return moment(this.created_at).fromNow()
		}
	},
  methods: {
    async fetchJobDetail(id) {
      const jobData = await this.$http.get(
        `https://jobs.github.com/positions/${id}.json`
      )
      this.job = await jobData.data
      console.log(this.job)
		},
		goBack(){
			this.$router.push("/")
		}
  },
}
</script>

<style></style>
