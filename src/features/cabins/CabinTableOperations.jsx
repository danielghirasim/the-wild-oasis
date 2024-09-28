import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            value: 'all',
            label: 'All',
          },
          {
            value: 'with-discount',
            label: 'With discount',
          },
          {
            value: 'no-discount',
            label: 'No discount',
          },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          { value: 'regular_price-asc', label: 'Sort by price (Low First)' },
          { value: 'regular_price-desc', label: 'Sort by price (High First)' },
          { value: 'discount-asc', label: 'Sort by discount (Low First)' },
          { value: 'discount-desc', label: 'Sort by discount (High First)' },
          { value: 'max_capacity-asc', label: 'Sort by capacity (Low First)' },
          { value: 'max_capacity-desc', label: 'Sort by capacity (High First)' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
