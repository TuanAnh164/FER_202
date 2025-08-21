import Form from 'react-bootstrap/Form';

export const SearchItem = ({ onQuickSearch, darkMode }) => {
  return (
      <Form>
        <Form.Control
          type="search"
          placeholder="Quick search"
          onChange={(e) => onQuickSearch(e.target.value)}
          className={`${darkMode ? ' bg-dark text-white' : 'bg-light text-dark'}`}
        />
      </Form>
  );
};
export default SearchItem;