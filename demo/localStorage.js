// Download items
localStorage.orderItems = JSON.stringify([
    "11111111-1111-1111-1111-111111111111",
    "22222222-2222-2222-2222-222222222222",
    "33333333-3333-3333-3333-333333333333"
]);

localStorage["11111111-1111-1111-1111-111111111111.metadata"] = JSON.stringify({
    name: "Dataset item 1",
    uuid: "11111111-1111-1111-1111-111111111111"
});

localStorage["22222222-2222-2222-2222-222222222222.metadata"] = JSON.stringify({
    name: "Dataset item 2",
    uuid: "22222222-2222-2222-2222-222222222222"
});

localStorage["33333333-3333-3333-3333-333333333333.metadata"] = JSON.stringify({
    name: "Dataset item 3",
    uuid: "33333333-3333-3333-3333-333333333333"
});


// Map items
localStorage.mapItems = JSON.stringify([
    {
        Uuid: "11111111-1111-1111-1111-111111111111",
        Title: "Dataset item 1",
    },
    {
        Uuid: "22222222-2222-2222-2222-222222222222",
        Title: "Dataset item 3",
    },
    {
        Uuid: "33333333-3333-3333-3333-333333333333",
        Title: "Dataset item 3",
    }
]);

// For testing at localhost
sessionStorage.isLocalKartkatalogEnvironment = true;
