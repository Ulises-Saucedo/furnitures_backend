## Express CRUD
This is a backend challenge:
<ul>
    <li>Get all furnitures registers</li>
    <li>Get all furnitures registers filtered and sorted by category</li>
    <li>Get all furnitures registers filtered by price less than or equal to a value and sorted in ascending order</li>
    <li>Get all furnitures registers filtered by price greater than or equal to a value and sorted in descending order</li>
    <li>Get one furniture by code</li>
    <li>Create furniture registers</li>
    <li>Update furniture registers by code</li>
    <li>Delete furniture registers by code</li>
    <li>Control non existent routes</li>
</ul>

| Methods       | URL                     |  Description                   |
| ------------- |:-----------------------:|:------------------------------:|
| GET           |/furnitures              |    Get all furnitures unordered|
| GET           |/furnitures/:id          | Get furniture by code          |
| POST          |/furnitures/furniture    |   Insert one furniture         |
| PUT           |/furnitures/furniture/:id| Edit one furniture by code     |
| DELETE        |/furnitures/furniture/:id| Delete one furniture by code   |

For /furnitures route exists queries parameters:
    <ul>
        <li>category: accept only 'asc' value</li>
        <li>lte: accept numbers value, returns furniture less than or equal to value</li>
        <li>gte: accept numbers value, returns furniture greater than or equal to value</li>
        <li>can combine url querie parameters</li>
    </ul>