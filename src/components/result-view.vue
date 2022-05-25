<template>
    <div class="modal-content">
        <div class="modal-header modal-header-border">
            <h4 class="modal-title font-weight-bold text-success">Finished!</h4>
        </div>
        <div class="modal-body">
            <h5 class="text-center">Hey, Good job!</h5>
            <label class="text-center w-100">You elapsed <span class="text-info">{{ elapsedTime }}</span> to complete.</label>
        </div>
        <div class="modal-footer text-right">
            <button class="btn btn-sm btn-light mr-2" @click="closeWindow">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResultView',
    props: ['elapsedTime'],
    methods: {
        closeWindow () {
            this.$emit('close')
        }
    }
}
</script>