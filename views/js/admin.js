document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'success') {
        alert('Application submitted successfully!');
    }

    const applicationForm = document.getElementById('applicationForm');

    applicationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        this.submit();
    });
});

new Vue({
    el: '#app',
    data: {
        agencies: [],
        servicesMap: {
            'all': '*',
            'disposal': 'first',
            'solar': 'second',
            'nigerian': 'third',
            'repair': 'fourth'
        }
    },

    methods: {
        async deleteAgency(agencyId) {
            try {
                await fetch(`/agency/api/deleteAgency/${agencyId}`, {
                    method: 'DELETE',
                });

                this.agencies = this.agencies.filter((agency) => agency._id !== agencyId);
            } catch (error) {
                console.error('Error deleting agency:', error);
            }
        },

        async approveAgency(agencyId) {
            try {
                const response = await fetch(`/agency/api/agency/${agencyId}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch agency details');
                }

                console.log("I am admin get agency")

                const agency = await response.json();
                const agencyClass = agency.agencySpecialty; //first, second, third, *
               
                const agencyToUpdate = this.agencies.find(agency => agency._id === agencyId);
                if (agencyToUpdate) {
                    agencyToUpdate.agencySpecialty = agencyClass;
                }
            } catch (error) {
                console.error('Error deleting agency:', error);
            }
        }
    },

    mounted() {
        // Fetch agency data when the component is mounted
        fetch('/agency/api/agencies') // Adjust the route to fetch agencies from your backend
            .then(response => response.json())
            .then(data => {
                this.agencies = data; // Update agencies array with fetched data
                console.log(this.agencies)
            })
            .catch(error => {
                console.error('Error fetching agencies:', error);
            });
    }
});