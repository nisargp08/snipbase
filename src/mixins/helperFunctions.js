export const helperFunctions = {
    methods : {
         //To generate toast
         generateToast(message, type) {
            this.$buefy.toast.open({
                message: message,
                type: type,
                duration: 5000
            })
        },
        //To generate snackbar for error messages
        generateSnackbar(message, type) {
            this.$buefy.snackbar.open({
                message: message,
                type: type,
                indefinite: true,
            })
        }
    }
}