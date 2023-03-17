<template>
    <div>
        <div class="mt-4 mb-3">
            <div class="max-w-sm mt-6 overflow-hidden bg-white rounded shadow-lg">
                <div>
                    <img
                        class="w-full"
                        :src="getAreasImage(image)"
                        onerror="this.onerror=null; this.src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';"
                        alt="Sunset in the mountains"
                    />
                </div>
                <div class="px-6 py-4">
                    <div class="mb-2 text-xl font-bold text-gray-900">Нарушение</div>
                    <p class="text-base text-gray-700">
                        {{ desc }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    image: {
        type: String,
        // default: "https://picsum.photos/id/1016/384/234",
    },
    desc: {
        type: String,
        default:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    },
    res: {
        type: String,
    },
});

const getAreasImage = (fileId) => {
    const name = fileId?.split("/").pop();
    if (!name) return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    return import.meta.env.VITE_API_S3_BUCKET + `${name}`;
};
</script>
