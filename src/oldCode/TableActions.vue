<template>
  <ActionButton
    :show-edit="config.showEdit"
    :show-delete="config.showDelete"
    :show-check="config.showCheck"
    :show-go-to-button="config.showGoto"
    :show-finish-button="config.showFinishButton"
    :show-view="config.showView"
    :show-print-button="config.showPrintButton"
    :item="item"
    :tooltips="tooltips"
    @edit="handleAction('edit', item)"
    @delete="handleAction('delete', item)"
    @check="handleAction('check', item)"
    @goto="handleAction('goto', item)"
    @view="handleAction('view', item)"
    @finishProcess="handleAction('finishProcess', item)"
    @print="handleAction('print', item)"
  />
</template>

<script setup>
import ActionButton from "./ActionButton.vue"

const props = defineProps({
  item: Object,
  config: Object,
  tooltips: Object,
})

const handleAction = (action, item) => {
  console.log('Action:', action, 'Item:', item)
}
</script>
