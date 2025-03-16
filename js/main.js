const colorPicker = document.getElementById('color')

const selectedScheme = document.querySelector('.select__head-selected')
const selectBody = document.querySelector('.select__body')

const schemeContainer = document.querySelector('.scheme')

window.addEventListener('click', (e) => {
    if (e.target.closest('.select__head')) {
        // Open or close select when clicking select head
        selectBody.classList.toggle('active')
    } else if (e.target.closest('.select__body-item')) {
        // Remove selected class from the current selected element
        const currentSelectedItem = document.querySelector(
            '.select__body-item.selected'
        )

        currentSelectedItem.classList.remove('selected')

        // Add selected class to the clicked item
        const clickedItem = e.target.closest('.select__body-item')
        clickedItem.classList.add('selected')

        // Change selected value
        const clickedItemValue =
            clickedItem.querySelector('.select__body-text').textContent
        selectedScheme.textContent = clickedItemValue

        // Close select body
        selectBody.classList.remove('active')
    } else if (e.target.id === 'generate-btn') {
        const hexValue = colorPicker.value.slice(1)
        const modeValue = selectedScheme.textContent.toLowerCase()

        getColorsScheme(hexValue, modeValue)
    } else if (e.target.closest('.scheme__item')) {
        const item = e.target.closest('.scheme__item')
        const hexValue = item.querySelector('.scheme__item-hex').textContent

        // Copy hex to the clipboard
        navigator.clipboard.writeText(hexValue)
        alert('Hex value copied!')
    } else if (!e.target.closest('.select')) {
        // Close select when clicking outside of the select
        selectBody.classList.remove('active')
    }
})

function renderColors(arr) {
    let html = ''
    for (let color of arr) {
        html += `
            <div class="scheme__item">
                <div class="scheme__item-color" style="background-color: ${color.hex.value};"></div>
                <p class="scheme__item-hex">${color.hex.value}</p>
            </div>
        `
    }

    schemeContainer.innerHTML = html
}

function getColorsScheme(hex, mode) {
    fetch(`https://www.thecolorapi.com/scheme/?hex=${hex}&mode=${mode}&count=5`)
        .then((res) => res.json())
        .then((data) => renderColors(data.colors))
}
