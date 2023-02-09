import { Component } from 'react';
import { toast } from 'react-toastify';
import { IconButton } from '../IconButton/IconButton';
import { Form, SearchInput } from './SearchForm.styled';
import { ReactComponent as LoupeIcon } from '../../icons/loupe.svg';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { SubmitForm } = this.props;
    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      toast.warn('Warning! Search must not be empty');

      return;
    }
    SubmitForm(searchQuery.toLowerCase());

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    const {
      state: { searchQuery },
      handleOnChange,
      handleOnSubmit,
    } = this;

    return (
      <Form onSubmit={handleOnSubmit}>
        <SearchInput
          type="text"
          autoComplete="off"
          placeholder="Search images..."
          name="searchQuery"
          autoFocus
          value={searchQuery}
          onChange={handleOnChange}
        />
        <IconButton type="submit" aria-label="search images">
          <LoupeIcon width="40" height="40" />
        </IconButton>
      </Form>
    );
  }
}
