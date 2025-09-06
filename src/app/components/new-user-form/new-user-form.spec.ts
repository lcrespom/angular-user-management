import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserForm } from './new-user-form';

describe('NewUserForm', () => {
  let component: NewUserForm;
  let fixture: ComponentFixture<NewUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NewUserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSaveUser event when form is valid and submitted', () => {
    // Arrange
    spyOn(component.onSaveUser, 'emit');
    const testUserName = 'testuser'; // 8 characters
    const testPassword = 'password'; // 8 characters
    // Fill the form with valid data
    component.userForm.patchValue({
      userName: testUserName,
      password1: testPassword,
      password2: testPassword,
      enabled: false,
      // expDate is already set by getInitialDate()
    });
    // Submit the form
    component.onSubmit();
    // Check that the onSaveUser event has been emitted
    expect(component.onSaveUser.emit).toHaveBeenCalledTimes(1);
    // Check event
    const emittedUser = (component.onSaveUser.emit as jasmine.Spy).calls.argsFor(0)[0];
    expect(emittedUser.userName).toBe(testUserName);
    expect(emittedUser.isEnabled).toBe(false);
    expect(emittedUser.expDate).toBeDefined();
  });

  it('should not emit onSaveUser event when userName is too short and should show error', () => {
    // Arrange
    spyOn(component.onSaveUser, 'emit');
    const shortUserName = 'test'; // 4 characters (below minimum of 5)
    const testPassword = 'password'; // 8 characters
    // Fill the form with invalid userName
    component.userForm.patchValue({
      userName: shortUserName,
      password1: testPassword,
      password2: testPassword,
      enabled: false,
    });
    // Try to submit the form
    component.onSubmit();
    // Check event
    expect(component.onSaveUser.emit).not.toHaveBeenCalled();
    // Check that the form is invalid
    expect(component.userForm.invalid).toBe(true);
    expect(component.userForm.get('userName')?.hasError('minlength')).toBe(true);
    expect(component.userForm.get('userName')?.touched).toBe(true);
  });
});
