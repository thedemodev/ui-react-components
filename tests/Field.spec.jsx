import Field from '../components/Field'
import { equal, ok } from 'assert'
import { renderer } from './helpers'

const render = renderer(Field)

const input = (field) => field.props.children[2]

describe('Field', () => {
  describe('default', () => {
    const field = render({
      label: 'Given Name'
    })

    it("renders tag 'div'", () => {
      equal(field.type, 'div')
    })

    it("has className 'cui__field'", () => {
      equal(field.props.className, 'cui__field')
    })

    describe('label', () => {
      const label = field.props.children[1]

      it("renders tag 'label'", () => {
        equal(label.type, 'label')
      })

      it("has className 'cui__field__label'", () => {
        equal(label.props.className, 'cui__field__label')
      })

      it('has the label text', () => (
        equal(label.props.children, 'Given Name')
      ))
    })

    describe('input', () => {
      it("renders tag 'input'", () => (
        equal(input(field).type, 'input')
      ))

      it("has className 'cui__field__input'", () => (
        equal(input(field).props.className, 'cui__field__input')
      ))
    })
  })

  describe('focused', () => {
    const field = render({
      label: 'Password',
      focus: true
    })

    it("has className 'is-focused'", () => (
      ok(field.props.className.match('is-focused'))
    ))
  })

  describe('with value', () => {
    const field = render({
      label: 'Billing Address',
      value: 'Some value'
    })

    it("has className 'is-filled'", () => (
      ok(field.props.className.match('is-filled'))
    ))

    describe('input', () => {
      it('has the value', () => {
        equal(input(field).props.value, 'Some value')
      })
    })
  })

  describe('error', () => {
    const field = render({
      label: 'Something',
      error: true
    })

    it("has className 'is-error'", () => (
      ok(field.props.className.match('is-error'))
    ))
  })

  describe('warning', () => {
    const field = render({
      label: 'Something',
      warning: true
    })

    it("has className 'is-warning'", () => (
      ok(field.props.className.match('is-warning'))
    ))
  })

  describe('disabled', () => {
    const field = render({
      label: 'Something',
      disabled: true
    })

    it("has className 'is-disabled'", () => (
      ok(field.props.className.match('is-disabled'))
    ))

    describe('input', () => {
      it('is disabled', () => (
        ok(input(field).props.disabled)
      ))
    })
  })

  describe('add a className', () => {
    const field = render({
      className: 'extra__className',
      label: 'Given Name'
    })

    it('has the extra className', () => {
      ok(field.props.className.match('extra__className'))
    })
  })

  describe('loading', () => {
    const field = render({
      label: 'Something',
      loading: true
    })

    it("has className 'is-loading'", () => (
      ok(field.props.className.match('is-loading'))
    ))
  })

  describe('centered', () => {
    const field = render({
      label: 'Something',
      centered: true
    })

    it("has className 'is-centered'", () => (
      ok(field.props.className.match('is-centered'))
    ))
  })

  describe('big', () => {
    const field = render({
      label: 'Something',
      big: true
    })

    it("has className 'big'", () => (
      ok(field.props.className.match('big'))
    ))
  })

  describe('square', () => {
    const field = render({
      label: 'Something',
      square: true
    })

    it("has className 'square'", () => (
      ok(field.props.className.match('square'))
    ))
  })

  describe('customize', () => {
    describe('unhovered, unfocused', () => {
      const field = render({
        customize: {
          borderColor: 'red',
          borderColorSelected: 'pink',
          borderRadius: '4px',
          labelColor: 'brown'
        },
        label: 'Mandatory label'
      })

      it('has the border color and no box shadow', () => {
        equal(field.props.style.borderColor, 'red')
        equal(field.props.style.boxShadow, undefined)
      })
    })

    describe('hover', () => {
      const field = render({
        customize: {
          borderColor: 'red',
          borderColorSelected: 'pink',
          borderRadius: '4px',
          labelColor: 'brown'
        },
        label: 'Mandatory label'
      })

      // Skipped because the shallow renderer does not have the capability
      // to set the state. This points to two issues:
      // - State should be avoided as much as possible, ideally only added in
      //   HOCs when absolutely necessary
      // - We will eventually need to switch to enzyme
      it.skip('has the selected border color and no box shadow', () => {
        equal(field.props.style.borderColor, 'pink')
        equal(field.props.style.boxShadow, undefined)
      })
    })

    describe('focus', () => {
      const field = render({
        customize: {
          borderColor: 'red',
          borderColorSelected: 'pink',
          borderRadius: '4px',
          labelColor: 'brown'
        },
        focus: true,
        label: 'Mandatory label'
      })

      it('has the selected border color and box shadow', () => {
        equal(field.props.style.borderColor, 'pink')
        equal(field.props.style.boxShadow, '0 0 4px pink')
      })
    })
  })

  describe('stacked', () => {
    describe('positions', () => {
      [
        'bottom',
        'center',
        'left',
        'right',
        'top'
      ].forEach((position) => {
        describe(`when in position ${position}`, () => {
          const field = render({
            label: `Stacked in ${position}`,
            [position]: true
          })
          it(`has className '${position}'`, () => (
            ok(field.props.className.match(position))
          ))
        })
      })

      return [ 'left', 'right' ].forEach((x) => {
        [ 'bottom', 'top' ].forEach((y) => {
          describe(`when in position ${y} ${x}`, () => {
            const field = render({
              label: `Stacked in ${y} ${x}`,
              [x]: true,
              [y]: true
            })

            it(`has className '${y}-${x}'`, () => (
              ok(field.props.className.match(`${y}-${x}`))
            ))
          })
        })
      })
    })

    describe('sizes', () => {
      const sizesMap = {
        '1/2': 'half',
        '1/3': 'third',
        '2/3': 'two-thirds',
        '1/4': 'quarter',
        '2/4': 'half',
        '3/4': 'three-quarters',
        '1/5': 'twenty',
        '2/5': 'forty',
        '3/5': 'sixty',
        '4/5': 'eighty'
      }

      Object.keys(sizesMap).map((size) => {
        const className = sizesMap[size]

        describe(size, () => {
          const field = render({
            label: 'The half',
            size
          })

          it(`has className '${className}'`, () => {
            ok(field.props.className.match(className))
          })
        })
      })
    })
  })
})
