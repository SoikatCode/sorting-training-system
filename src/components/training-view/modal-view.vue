<template>
    <div class="modal-content">
        <div class="modal-header modal-header-border">
            <h5 class="modal-title font-weight-bold">How many people?</h5>
        </div>
        <div class="modal-body">
            <small>Enter a number of how many people you want to add to the list.</small>
            <input v-model="people_number" type="text" name="people number" class="form-control mt-3" v-validate="{ required: true, numeric: true, max_value: 100, min_value: 20 }">
            <small v-if="errors.has('people number')" class="text-danger">{{ errors.first("people number") }}</small>
        </div>
        <div class="modal-footer text-right">
            <button class="btn btn-sm btn-light mr-2" @click="closeWindow">Cancel</button>
            <button class="btn btn-sm btn-primary" @click="onStartClick">Start</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalView',
    props: ['handlers'],
    data () {
        return {
            people_number: ''
        }
    },
    methods: {
        closeWindow () {
            this.$emit('close')
        },
        onStartClick () {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.handlers.actionConfirmed(this.people_number)
                    this.closeWindow()
                }
            })
        }
    }
}
</script>